import { getOpenRouterProvider } from "@/lib/ai/provider";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { Output, smoothStream, streamText } from "ai";
import { z } from "zod";
import {
  AITrainingDaySchema,
  TrainingDaySchema,
} from "@/lib/validations/training";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Rutina existente (toda, sin días completados)
    const parsedRoutine = z.array(TrainingDaySchema).safeParse(body.routine);

    if (!parsedRoutine.success || parsedRoutine.data.length === 0) {
      return Response.json(
        { error: "Routine missing or invalid" },
        { status: 400 },
      );
    }

    const currentRoutine = parsedRoutine.data;
    const totalDays = currentRoutine.length;
    const targetTimes = currentRoutine.map((d) =>
      d.ejercicios.reduce((acc, e) => acc + (e.duracion ?? 0), 0),
    );

    const openrouter = getOpenRouterProvider();
    const model = process.env.OPENROUTER_MODEL ?? "openrouter/auto";

    const prompt = `
Actúa como entrenador profesional de running.

Rutina actual (JSON):
${JSON.stringify(
  currentRoutine.map((d) => ({
    tipo: d.tipo,
    intensidad: d.intensidad,
    ejercicios: d.ejercicios,
    razon: d.razon,
  })),
  null,
  2,
)}

Genera una NUEVA rutina completa mejorada basada en la anterior. 
Reglas:
- Mantén el número de días exactamente igual: ${totalDays}
- Usa SOLO estos tipos: suave, largo, intervalos, tempo, fartlek, recuperacion, cruzado, fuerza, descanso
- Usa SOLO intensidades: baja, media, alta
- Cada día debe tener mínimo 2 ejercicios
- Todo en español
- "razon" máximo 200 caracteres
- Devuelve exactamente ${totalDays} elementos
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
          send("start", { totalDays });

          let index = 0;
          for await (const day of result.elementStream) {
            const adjusted = adjustSessionTime(
              day,
              targetTimes[index] ?? targetTimes[0] ?? 45,
            );
            const finalDay = {
              ...adjusted,
              numero_dia: index + 1,
              // Nueva rutina: reinicia el progreso.
              estado: index === 0 ? "por_completar" : "pendiente",
            };
            send("day", finalDay);
            index += 1;
            send("progress", { generatedDays: index, totalDays });
          }

          send("done", { generatedDays: index, totalDays });
          controller.close();
        } catch (error) {
          send("error", {
            message:
              error instanceof Error
                ? error.message
                : "Error actualizando rutina",
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
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
