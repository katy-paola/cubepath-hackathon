import { Output, generateText } from "ai";

import { getOpenRouterProvider } from "@/lib/ai/provider";
import {
  AIRoutineSchema,
  AITrainingDaySchema,
} from "@/lib/validations/training";
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

  const openrouter = getOpenRouterProvider();
  const model = process.env.OPENROUTER_MODEL ?? "openrouter/auto";

  const result = await generateText({
    model: openrouter(model),
    system: "Responde únicamente datos válidos para la rutina solicitada.",
    prompt,
    output: Output.array({
      element: AITrainingDaySchema,
    }),
  });

  const parsed = AIRoutineSchema.safeParse(result.output);

  if (!parsed.success) {
    throw new Error("Invalid AI routine structure");
  }

  return parsed.data;
}
