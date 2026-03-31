import { generateRoutineAI } from "@/lib/ai/generate-routine";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { RoutineConfigSchema } from "@/lib/validations/config";
import type { RoutineConfig } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = RoutineConfigSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid RoutineConfig" }, { status: 400 });
  }

  const config: RoutineConfig = parsed.data;

  // Generar rutina con IA
  const aiRoutine = await generateRoutineAI(config);

  // Ajustar duración exacta de cada día
  const adjustedDays = aiRoutine.map((dia) =>
    adjustSessionTime(dia, config.tiempo_sesion),
  );

  // Agregar numero_dia y estado
  const finalDays = adjustedDays.map((dia, index) => ({
    ...dia,
    numero_dia: index + 1,
    estado: index === 0 ? "por_completar" : "pendiente",
  }));

  return Response.json({ data: finalDays });
}
