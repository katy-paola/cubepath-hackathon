import { upgradeRoutineAI } from "@/lib/ai/upgrade-routine";
import { AIRoutineSchema } from "@/lib/validations/training";
import type { AITrainingDaySchemaType } from "@/lib/validations/training";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Rutina existente (toda, sin días completados)
    const currentRoutine: AITrainingDaySchemaType[] = body.routine;

    if (!Array.isArray(currentRoutine) || currentRoutine.length === 0) {
      return Response.json(
        { error: "Routine missing or empty" },
        { status: 400 },
      );
    }

    // Llamamos a la IA para generar la nueva rutina mejorada
    const newRoutine: AITrainingDaySchemaType[] =
      await upgradeRoutineAI(currentRoutine);

    // Validación contra schema
    const parsed = AIRoutineSchema.safeParse(newRoutine);
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid AI routine structure" },
        { status: 500 },
      );
    }

    // Reasignar número de día y estado por defecto
    const finalRoutine = parsed.data.map((day, index) => ({
      ...day,
      numero_dia: index + 1,
      estado: index === 0 ? "por_completar" : "pendiente",
    }));

    return Response.json({ data: finalRoutine });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
