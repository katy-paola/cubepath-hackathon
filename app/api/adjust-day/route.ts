import { generateAdjustedTrainingDay } from "@/lib/ai/generate-adjusted-day";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { DailyAdjustmentSchema } from "@/lib/validations/adjustments";
import { TrainingDaySchema } from "@/lib/validations/training";

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

    const modelId = process.env.OPENROUTER_MODEL ?? "openrouter/auto";

    const adjustedDay = await generateAdjustedTrainingDay({
      modelId,
      dayJson: JSON.stringify(day, null, 2),
      adjustmentJson: JSON.stringify(adjustment, null, 2),
    });

    const adjusted = adjustment.tiempo_sesion
      ? adjustSessionTime(adjustedDay, adjustment.tiempo_sesion)
      : adjustedDay;

    return Response.json({
      data: {
        ...adjusted,
        numero_dia: day.numero_dia,
        estado: day.estado,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error adjusting day";
    return Response.json({ error: message }, { status: 500 });
  }
}
