import type { TrainingDay } from "@/lib/types";

/** Primera ranura no completada → `por_completar`; el resto de no completados → `pendiente`. */
export function reconcileSequentialDayStatuses(
  dias: TrainingDay[],
): TrainingDay[] {
  const firstIncompleteIndex = dias.findIndex((d) => d.estado !== "completado");
  if (firstIncompleteIndex === -1) return dias;
  return dias.map((d, i) => {
    if (d.estado === "completado") return d;
    return {
      ...d,
      estado: i === firstIncompleteIndex ? "por_completar" : "pendiente",
    };
  });
}
