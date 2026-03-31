import { getOpenRouterProvider } from "@/lib/ai/provider";
import { Output, generateText } from "ai";
import { z } from "zod";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { DailyAdjustmentSchema } from "@/lib/validations/adjustments";
import { AITrainingDaySchema, TrainingDaySchema } from "@/lib/validations/training";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedAdjustment = DailyAdjustmentSchema.safeParse(body.adjustment);
    if (!parsedAdjustment.success) {
      return Response.json({ error: "Invalid adjustment" }, { status: 400 });
    }

    const parsedDay = TrainingDaySchema.safeParse(body.day);
    if (!parsedDay.success) {
      return Response.json({ error: "Invalid day" }, { status: 400 });
    }

    const adjustment = parsedAdjustment.data;
    const day = parsedDay.data;

    const openrouter = getOpenRouterProvider();
    const model = process.env.OPENROUTER_MODEL ?? "openrouter/auto";

    const prompt = `
Actúa como entrenador profesional de running.

Tienes este día de entrenamiento (JSON):
${JSON.stringify(day, null, 2)}

Y estos ajustes para HOY (JSON):
${JSON.stringify(adjustment, null, 2)}

Reglas:
- Mantén el tipo e intensidad dentro de los valores permitidos
- Mantén mínimo 2 ejercicios
- Respeta el mismo "numero_dia" y "estado" (no los incluyas en la salida; solo ajusta el contenido del día)
- Todo en español
`;

    const result = await generateText({
      model: openrouter(model),
      system: "Responde únicamente datos válidos para el día ajustado.",
      prompt,
      output: Output.object({
        schema: z.object({
          day: AITrainingDaySchema,
        }),
      }),
    });

    const adjusted = adjustment.tiempo_sesion
      ? adjustSessionTime(result.output.day, adjustment.tiempo_sesion)
      : result.output.day;

    return Response.json({
      data: {
        ...adjusted,
        numero_dia: day.numero_dia,
        estado: day.estado,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error adjusting day";
    return Response.json({ error: message }, { status: 500 });
  }
}
