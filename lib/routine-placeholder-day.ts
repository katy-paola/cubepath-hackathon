import type { TrainingDay } from "@/lib/types";

/** Día mínimo válido; la IA lo sustituye al reajustar (p. ej. al subir frecuencia). */
export function createPlaceholderTrainingDay(numero_dia: number): TrainingDay {
  return {
    numero_dia,
    tipo: "recuperacion",
    intensidad: "baja",
    ejercicios: [
      {
        nombre: "Trote suave",
        duracion: 5,
        descripcion: "Ritmo conversacional.",
      },
      {
        nombre: "Movilidad",
        duracion: 5,
        descripcion: "Movilidad articular suave.",
      },
    ],
    razon: "Marcador temporal antes del reajuste.",
    estado: "pendiente",
  };
}
