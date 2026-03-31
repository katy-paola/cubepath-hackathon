import { adjustDayAI } from "@/lib/ai/adjust-day";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { DailyAdjustmentSchema } from "@/lib/validations/adjustments";
import type { AITrainingDaySchemaType } from "@/lib/validations/training";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = DailyAdjustmentSchema.safeParse(body.adjustment);
  if (!parsed.success) {
    return Response.json({ error: "Invalid adjustment" }, { status: 400 });
  }

  const adjustment = parsed.data;
  const day: AITrainingDaySchemaType & { numero_dia: number; estado: string } =
    body.day;

  const adjustedDay = await adjustDayAI(day, adjustment);

  const finalDay = adjustment.tiempo_sesion
    ? adjustSessionTime(adjustedDay, adjustment.tiempo_sesion)
    : adjustedDay;

  const finalDayWithMeta = {
    ...finalDay,
    numero_dia: day.numero_dia,
    estado: day.estado,
  };

  return Response.json({ data: finalDayWithMeta });
}
