import { openrouter } from "./openrouter";
import { AITrainingDaySchemaType } from "../validations/training";
import type { DailyAdjustment } from "@/lib/types";

export async function adjustDayAI(
  day: AITrainingDaySchemaType,
  adjustment: DailyAdjustment,
): Promise<AITrainingDaySchemaType> {
  const prompt = `
Actúa como entrenador profesional de running.

Ajusta este día de entrenamiento según:
${adjustment.energia ? `energia: ${adjustment.energia}` : ""}
${adjustment.tiempo_sesion ? `tiempo_sesion: ${adjustment.tiempo_sesion}` : ""}
${adjustment.lugar ? `lugar: ${adjustment.lugar}` : ""}
${
  adjustment.salud_limitaciones
    ? `salud_limitaciones: ${adjustment.salud_limitaciones.join(", ")}`
    : ""
}

Día actual:
${JSON.stringify(day)}

REGLAS:
- Ajusta los ejercicios, tipo e intensidad según las condiciones
- La duración total debe coincidir con tiempo_disponible si se proporciona
- "razon" máximo 200 caracteres
- Todo en español
- SOLO devuelve JSON válido
- SIN texto adicional

EJEMPLO DE FORMATO DE SALIDA:
{
  "tipo": "suave",
  "intensidad": "baja",
  "razon": "Activación y movilidad",
  "ejercicios": [
    {
      "nombre": "Trote suave",
      "duracion": 10,
      "descripcion": "Trote ligero para calentar"
    },
    {
      "nombre": "Movilidad de piernas",
      "duracion": 5,
      "descripcion": "Estiramientos dinámicos de piernas"
    }
  ]
}
`;

  const completion = await openrouter.chat.completions.create({
    model: "openrouter/free",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0].message.content;

  if (!content) throw new Error("Empty AI response");

  let parsed: AITrainingDaySchemaType;

  try {
    parsed = JSON.parse(content) as AITrainingDaySchemaType;
  } catch {
    throw new Error("Invalid JSON from AI");
  }

  return parsed;
}
