import {
  RoutineAIResponseSchema,
  RoutineAISchema,
} from "@/lib/validations/training";
import { generateRoutineAI } from "@/lib/ai/test-ai";
import { RoutineConfig } from "@/lib/types";

export async function GET() {
  const config: RoutineConfig = {
    objetivo: "resistencia",
    nivel: "avanzado",
    frecuencia_semanal: 5,
    tiempo_sesion: 30,
    lugar_entrenamiento: "exterior",
    compromiso: "alto",
    salud_limitaciones: "condicion_cardiaca",
  };

  const raw = await generateRoutineAI(config);

  const cleaned = raw
    ?.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned || "{}");

  // Validar contra schema de IA (sin estado)
  const aiResponse = RoutineAIResponseSchema.parse(parsed);

  const adjustedDays = aiResponse.dias.map((dia) => {
    const total = dia.ejercicios.reduce((acc, e) => acc + (e.duracion || 0), 0);

    const diff = config.tiempo_sesion - total;

    // si ya está correcto
    if (diff === 0) return dia;

    const ejercicios = [...dia.ejercicios];

    const last = ejercicios[ejercicios.length - 1];

    if (last && last.duracion) {
      // evitar duraciones inválidas
      const nuevaDuracion = last.duracion + diff;

      last.duracion = nuevaDuracion > 1 ? nuevaDuracion : 1;
    }

    return {
      ...dia,
      ejercicios,
    };
  });

  // Agregar estado a cada día
  const withEstado = {
    dias: adjustedDays.map((dia) => ({
      ...dia,
      estado: "pendiente",
    })),
  };

  // Validar contra schema final (con estado)
  const validated = RoutineAISchema.parse(withEstado);

  return Response.json({ data: validated });
}
