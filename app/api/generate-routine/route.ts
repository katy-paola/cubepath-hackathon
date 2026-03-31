import { getOpenRouterProvider } from "@/lib/ai/provider";
import { Output, smoothStream, streamText } from "ai";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { RoutineConfigSchema } from "@/lib/validations/config";
import { AITrainingDaySchema } from "@/lib/validations/training";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = RoutineConfigSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Invalid RoutineConfig" }, { status: 400 });
    }

    const config = parsed.data;
    const openrouter = getOpenRouterProvider();
    const model = process.env.OPENROUTER_MODEL ?? "openrouter/auto";

    const prompt = `
Actúa como entrenador profesional de running.

Genera una rutina de ${config.frecuencia_semanal} días basada en:
- objetivo: ${config.objetivo}
- nivel: ${config.nivel}
- tiempo por sesión: ${config.tiempo_sesion} minutos
- lugar: ${config.lugar_entrenamiento}
- compromiso: ${config.compromiso}
- salud: ${config.salud_limitaciones?.join(", ") ?? "ninguna"}

Reglas:
- Usa SOLO estos tipos: suave, largo, intervalos, tempo, fartlek, recuperacion, cruzado, fuerza, descanso
- Usa SOLO intensidades: baja, media, alta
- Cada día debe tener mínimo 2 ejercicios
- La suma de duración de ejercicios por día debe ser ${config.tiempo_sesion}
- "razon" máximo 200 caracteres
- Todo en español
 - Devuelve exactamente ${config.frecuencia_semanal} elementos
`;

    const result = streamText({
      model: openrouter(model),
      system: "Responde únicamente datos válidos para la rutina solicitada.",
      prompt,
      abortSignal: req.signal,
      experimental_transform: smoothStream({
        delayInMs: 12,
        chunking: "line",
      }),
      output: Output.array({
        element: AITrainingDaySchema,
      }),
      onAbort: () => {
        // stream will emit abort via SSE in the ReadableStream handler
      },
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (event: string, data: unknown) => {
          controller.enqueue(
            encoder.encode(
              `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`,
            ),
          );
        };

        try {
          send("start", { totalDays: config.frecuencia_semanal });

          let index = 0;
          for await (const day of result.elementStream) {
            const adjusted = adjustSessionTime(day, config.tiempo_sesion);
            const finalDay = {
              ...adjusted,
              numero_dia: index + 1,
              estado: index === 0 ? "por_completar" : "pendiente",
            };
            send("day", finalDay);
            index += 1;
            send("progress", { generatedDays: index, totalDays: config.frecuencia_semanal });
          }

          send("done", { generatedDays: index, totalDays: config.frecuencia_semanal });
          controller.close();
        } catch (error) {
          // If aborted, Next/AI SDK will throw an abort error; surface it as an SSE event.
          send("error", {
            message: error instanceof Error ? error.message : "Error generando rutina",
            aborted: req.signal.aborted,
          });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error generating routine";
    return Response.json({ error: message }, { status: 500 });
  }
}
