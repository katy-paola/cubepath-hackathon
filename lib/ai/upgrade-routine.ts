import { openrouter } from "./openrouter";
import { AIRoutineSchema } from "../validations/training";
import type { AITrainingDaySchemaType } from "@/lib/validations/training";

/**
 * Genera una nueva versión mejorada de la rutina completa,
 * tomando como referencia la rutina actual.
 */
export async function upgradeRoutineAI(
  currentRoutine: AITrainingDaySchemaType[],
): Promise<AITrainingDaySchemaType[]> {
  const prompt = `
Actúa como entrenador profesional de running.

Aquí está la rutina actual:
${JSON.stringify(currentRoutine)}

Genera una NUEVA rutina completa mejorada basada en la anterior. 
- Mantén coherencia con el objetivo, nivel y tiempos de sesión de los días existentes.
- Varía ejercicios y tipos para progresión y diversidad.
- Cada día debe tener mínimo 2 ejercicios.
- Los ejercicios deben ser reales de running.
- Duración total por día debe coincidir con la original.
- "razon" máximo 200 caracteres.
- Todo en español.
- SOLO devuelve JSON válido, SIN texto adicional.

Formato: igual a AITrainingDaySchemaType (tipo, intensidad, ejercicios, razon)
`;

  const completion = await openrouter.chat.completions.create({
    model: "openrouter/free",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0].message.content;

  if (!content) {
    throw new Error("Empty AI response");
  }

  let parsed: AITrainingDaySchemaType[];

  try {
    parsed = JSON.parse(content) as AITrainingDaySchemaType[];
  } catch {
    throw new Error("Invalid JSON from AI");
  }

  const result = AIRoutineSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error("Invalid AI routine structure");
  }

  return result.data;
}
