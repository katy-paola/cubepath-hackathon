import { AITrainingDaySchemaType } from "../validations/training";

export function adjustSessionTime(
  day: AITrainingDaySchemaType,
  targetTime: number,
) {
  const total = day.ejercicios.reduce((acc, e) => acc + e.duracion, 0);
  const diff = targetTime - total;

  if (diff === 0) return day;

  const ejercicios = [...day.ejercicios];
  const last = ejercicios[ejercicios.length - 1];

  if (last) {
    const nuevaDuracion = last.duracion + diff;
    last.duracion = nuevaDuracion > 1 ? nuevaDuracion : 1;
  }

  return {
    ...day,
    ejercicios,
  };
}
