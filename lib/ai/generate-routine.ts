import { openrouter } from "./openrouter";
import { AIRoutineSchema } from "../validations/training";
import { RoutineConfig } from "@/lib/types";

export async function generateRoutineAI(config: RoutineConfig) {
  const prompt = `
Actúa como entrenador profesional de running.

Genera una rutina de ${config.frecuencia_semanal} días basada en:

objetivo: ${config.objetivo}
nivel: ${config.nivel}
tiempo por sesión: ${config.tiempo_sesion} minutos
lugar: ${config.lugar_entrenamiento}
compromiso: ${config.compromiso}
salud: ${config.salud_limitaciones}

REGLAS:
- Usa SOLO estos tipos: suave, largo, intervalos, tempo, fartlek, recuperacion, cruzado, fuerza, descanso
- Usa SOLO intensidades: baja, media, alta
- Cada día debe tener mínimo 2 ejercicios
- La suma de los ejercicios debe ser exactamente ${config.tiempo_sesion} minutos
- "razon" máximo 200 caracteres
- Todo en español

FORMATO:
- SOLO devuelve un ARRAY JSON
- SIN texto adicional

[
  {
    "tipo": "suave",
    "intensidad": "baja",
    "razon": "string",
    "ejercicios": [
      {
        "nombre": "string",
        "duracion": number,
        "descripcion": "string"
      }
    ]
  }
]
`;

  const completion = await openrouter.chat.completions.create({
    model: "openrouter/free",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0].message.content;

  if (!content) {
    throw new Error("Empty AI response");
  }

  let parsed;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Invalid JSON from AI");
  }

  const result = AIRoutineSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error("Invalid AI structure");
  }

  return result.data;
}
