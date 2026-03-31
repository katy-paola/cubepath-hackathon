import { adjustRoutineAI } from "@/lib/ai/adjust-routine";
import { UpdateRoutineSchema } from "@/lib/validations/updateRoutine";
import type { AITrainingDaySchemaType } from "@/lib/validations/training";
import type { RoutineConfigSchemaType } from "@/lib/validations/config";

export async function POST(req: Request) {
  const body = await req.json();

  // Validar cambios (todos opcionales)
  const parsed = UpdateRoutineSchema.safeParse(body.update);
  if (!parsed.success) {
    return Response.json({ error: "Invalid update" }, { status: 400 });
  }
  const updateData: Partial<RoutineConfigSchemaType> = parsed.data;

  // Rutina existente
  const currentRoutine: (AITrainingDaySchemaType & {
    numero_dia: number;
    estado: string;
  })[] = body.routine;

  // Ajustar la rutina completa según updateData
  const adjustedRoutine = await adjustRoutineAI(currentRoutine, updateData);

  return Response.json({ data: adjustedRoutine });
}
