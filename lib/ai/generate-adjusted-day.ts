import { Output, generateText } from "ai";
import { z } from "zod";

import { wrapOpenRouterForJsonOutput } from "./openrouter-json-model";
import { extractJsonObjectFromLlmText } from "./parse-llm-json";
import { AITrainingDaySchema } from "@/lib/validations/training";
import type { AITrainingDaySchemaType } from "@/lib/validations/training";

const DayWrapperSchema = z.object({
  day: AITrainingDaySchema,
});

function buildAdjustDayPrompt(dayJson: string, adjustmentJson: string) {
  return `
Actúa como entrenador profesional de running.

Día actual (JSON):
${dayJson}

Ajustes para HOY (JSON):
${adjustmentJson}

Salida obligatoria: un ÚNICO objeto JSON con esta forma exacta (sin markdown, sin comentarios, sin texto antes o después):
{"day":{"tipo":"...","intensidad":"...","ejercicios":[...],"razon":"..."}}

Reglas:
- tipo debe ser uno de: suave, largo, intervalos, tempo, fartlek, recuperacion, cruzado, fuerza, descanso
- intensidad debe ser una de: baja, media, alta
- ejercicios: array con al menos 2 ítems; cada uno: nombre (string), duracion (entero positivo, minutos), descripcion (string)
- razon: string, máximo 200 caracteres
- Mantén coherencia con los ajustes (energía, tiempo, lugar, salud)
- Todo en español
`.trim();
}

function parseDayFromPlainText(text: string): AITrainingDaySchemaType {
  const raw = extractJsonObjectFromLlmText(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("La respuesta no era JSON válido.");
  }
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("La respuesta JSON no es un objeto.");
  }
  const obj = parsed as Record<string, unknown>;
  const dayPayload = obj.day ?? obj;
  const validated = AITrainingDaySchema.safeParse(dayPayload);
  if (!validated.success) {
    throw new Error(
      `El día generado no cumple el formato: ${validated.error.message}`,
    );
  }
  return validated.data;
}

export async function generateAdjustedTrainingDay(options: {
  modelId: string;
  dayJson: string;
  adjustmentJson: string;
}): Promise<AITrainingDaySchemaType> {
  const { modelId, dayJson, adjustmentJson } = options;
  const model = wrapOpenRouterForJsonOutput(modelId);
  const prompt = buildAdjustDayPrompt(dayJson, adjustmentJson);

  try {
    const result = await generateText({
      model,
      system:
        "Generas solo JSON válido según el esquema pedido. Sin markdown ni prosa.",
      prompt,
      maxRetries: 2,
      output: Output.object({
        schema: DayWrapperSchema,
        name: "adjusted_day",
        description: "Día de entrenamiento ajustado (propiedad day)",
      }),
    });
    return result.output.day;
  } catch {
    const repairPrompt = `${prompt}

CRÍTICO: Responde únicamente con el objeto JSON. Propiedad raíz obligatoria: "day".`;

    const plain = await generateText({
      model,
      system:
        'Responde únicamente un objeto JSON. La raíz debe incluir la clave "day" con el entrenamiento.',
      prompt: repairPrompt,
      maxRetries: 1,
    });

    return parseDayFromPlainText(plain.text);
  }
}
