import { openrouter } from "./openrouter";
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

- La salud tiene prioridad absoluta:
  - condición cardiaca → intensidad SIEMPRE baja (sin excepciones)
  - lesiones → bajo impacto
  - respiratoria → baja a media con pausas

- La intensidad debe coincidir con los ejercicios:
  - baja → trote suave, técnica, movilidad, fuerza sin impacto (SIN sprints, tempo, intervalos exigentes, saltos)
  - media → cambios de ritmo moderados
  - alta → intervalos exigentes, sprints, tempo

- Mantén el nivel del usuario:
  - avanzado → estructura clara (bloques), control de ritmo, técnica, progresión
  - evita rutinas básicas o simples

- Varía los entrenamientos en la semana:
  - combinar resistencia, tecnica y fuerza
  - no todos los días iguales

- Cada día debe tener 2 o más ejercicios (no uno solo)

- Ajusta según:
  - lugar → contexto real
  - compromiso → nivel de exigencia

- Usar solo ejercicios reales de running (no inventados)
- Todo en español

- La "razon":
  - explica el objetivo del entrenamiento del día
  - NO mencionar salud, nivel o intensidad

REGLA CRÍTICA:
- La suma total de cada día DEBE ser exactamente ${config.tiempo_sesion} minutos

FORMATO:

- SOLO JSON válido
- SIN texto extra

{
  "dias": [
    {
      "dia": number,
      "tipo": "resistencia" | "velocidad" | "fuerza" | "tecnica",
      "intensidad": "baja" | "media" | "alta",
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
