import { getOpenRouterProvider } from "@/lib/ai/provider";
import { Output, generateText } from "ai";
import { z } from "zod";
import { UpdateRoutineSchema } from "@/lib/validations/updateRoutine";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { AIRoutineSchema, TrainingDaySchema } from "@/lib/validations/training";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedUpdate = UpdateRoutineSchema.safeParse(body.update);
    if (!parsedUpdate.success) {
      return Response.json({ error: "Invalid update" }, { status: 400 });
    }

    const parsedRoutine = z.array(TrainingDaySchema).safeParse(body.routine);
    if (!parsedRoutine.success) {
      return Response.json({ error: "Invalid routine" }, { status: 400 });
    }

    const update = parsedUpdate.data;
    const currentRoutine = parsedRoutine.data;

    const openrouter = getOpenRouterProvider();
    const model = process.env.OPENROUTER_MODEL ?? "openrouter/auto";

    const prompt = `
Actúa como entrenador profesional de running.

Rutina actual (JSON):
${JSON.stringify(currentRoutine, null, 2)}

Actualización solicitada (JSON):
${JSON.stringify(update, null, 2)}

Reglas:
- Mantén el número de días igual a la rutina actual
- Usa SOLO estos tipos: suave, largo, intervalos, tempo, fartlek, recuperacion, cruzado, fuerza, descanso
- Usa SOLO intensidades: baja, media, alta
- Cada día debe tener mínimo 2 ejercicios
- "razon" máximo 200 caracteres
- Todo en español
`;

    const result = await generateText({
      model: openrouter(model),
      system: "Responde únicamente datos válidos para la rutina ajustada.",
      prompt,
      output: Output.object({
        schema: z.object({
          rutina: AIRoutineSchema,
        }),
      }),
    });

    const targetTime = update.tiempo_sesion;
    const adjusted = result.output.rutina.map((day: any) =>
      targetTime ? adjustSessionTime(day, targetTime) : day,
    );

    const finalRoutine = adjusted.map((day: any, index: number) => ({
      ...day,
      numero_dia: index + 1,
      estado: currentRoutine[index]?.estado ?? (index === 0 ? "por_completar" : "pendiente"),
    }));

    return Response.json({ data: finalRoutine });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error adjusting routine";
    return Response.json({ error: message }, { status: 500 });
  }
}
