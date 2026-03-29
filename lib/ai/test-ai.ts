import { openrouter } from "./openrouter";
import { RoutineConfig } from "@/lib/types";

export async function generateRoutineAI(config: RoutineConfig) {
  const prompt = `
Eres un entrenador profesional de running.

Genera una rutina de ${config.frecuencia_semanal} días basada en:

- Objetivo: ${config.objetivo}
- Nivel: ${config.nivel}
- Tiempo por sesión: ${config.tiempo_sesion} minutos
- Lugar: ${config.lugar_entrenamiento}
- Compromiso: ${config.compromiso}
- Salud: ${config.salud_limitaciones}

REGLAS OBLIGATORIAS:

- Devuelve SOLO JSON válido (sin \`\`\`)
- NO agregues campos extra
- NO expliques nada fuera del JSON
- TODO el contenido debe estar en español
- NO uses inglés en ningún campo
- Los nombres de ejercicios deben estar en español
- Las descripciones deben estar en español claro y natural
- Usa EXACTAMENTE estas claves (no variantes):

"dia"
"tipo"
"intensidad"
"razon"
"ejercicios"
"nombre"
"duracion"
"descripcion"

- Si escribes "razón" en lugar de "razon", es incorrecto

- Usa SOLO estos valores:

tipo: "resistencia" | "velocidad" | "fuerza" | "tecnica"
intensidad: "baja" | "media" | "alta"

- Los ejercicios deben ser reales de running (ej: trote suave, intervalos, sprints, caminata, etc.)
- NO inventes nombres raros

FORMATO:

{
  "dias": [
    {
      "dia": number,
      "tipo": string,
      "intensidad": string,
      "razon": string,
      "ejercicios": [
        {
          "nombre": string,
          "duracion": number,
          "descripcion": string
        }
      ]
    }
  ]
}
`;

  const completion = await openrouter.chat.completions.create({
    model: "openrouter/free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}
