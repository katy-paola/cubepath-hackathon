import { openrouter } from "./openrouter";
import { AIRoutineSchema, AITrainingDaySchemaType } from "../validations/training";
import type { RoutineConfigSchemaType } from "@/lib/validations/config";

export async function adjustRoutineAI(
  currentRoutine: (AITrainingDaySchemaType & { numero_dia: number; estado: string })[],
  updateData: Partial<RoutineConfigSchemaType>
): Promise<(AITrainingDaySchemaType & { numero_dia: number; estado: string })[]> {

  // Filtrar solo los días pendientes
  const daysToAdjust = currentRoutine.filter(day => day.estado !== "completado");

  const prompt = `
Actúa como entrenador profesional de running.

Ajusta la siguiente rutina pendiente:
${JSON.stringify(daysToAdjust)}

Aplicando estos cambios opcionales:
${updateData.objetivo ? `objetivo: ${updateData.objetivo}` : ""}
${updateData.nivel ? `nivel: ${updateData.nivel}` : ""}
${updateData.tiempo_sesion ? `tiempo por sesión: ${updateData.tiempo_sesion}` : ""}
${updateData.frecuencia_semanal ? `frecuencia semanal: ${updateData.frecuencia_semanal}` : ""}
${updateData.lugar_entrenamiento ? `lugar: ${updateData.lugar_entrenamiento}` : ""}
${updateData.compromiso ? `compromiso: ${updateData.compromiso}` : ""}
${updateData.salud_limitaciones ? `salud: ${updateData.salud_limitaciones.join(", ")}` : ""}

Reglas:
- Mantén mínimo 2 ejercicios por día
- Ajusta tipo, intensidad y ejercicios según los cambios
- La suma de duraciones debe coincidir con "tiempo por sesión" si se modifica
- "razon" máximo 200 caracteres
- Todo en español
- SOLO devuelve un ARRAY JSON con objetos así:
  {
    "tipo": "suave | largo | intervalos | tempo | fartlek | recuperacion | cruzado | fuerza | descanso",
    "intensidad": "baja | media | alta",
    "razon": "string",
    "ejercicios": [
      {
        "nombre": "string",
        "duracion": number,
        "descripcion": "string"
      }
    ]
  }
- SIN texto adicional
`;

  const completion = await openrouter.chat.completions.create({
    model: "openrouter/free",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error("Empty AI response");

  let parsed: AITrainingDaySchemaType[];
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Invalid JSON from AI");
  }

  const result = AIRoutineSchema.safeParse(parsed);
  if (!result.success) throw new Error("Invalid AI structure");

  // Reconstruir la rutina completa manteniendo días completados
  const finalRoutine = currentRoutine.map(day => {
    if (day.estado === "completado") return day;
    const adjustedDay = result.data.shift()!;
    return {
      ...adjustedDay,
      numero_dia: day.numero_dia,
      estado: day.estado,
    };
  });

  return finalRoutine;
}