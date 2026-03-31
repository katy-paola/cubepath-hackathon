import { Intensity } from "./training";

export type Progress = {
  consistencia: {
    completados: number;
    total: number;
  };

  tiempo_total: number;
  /** Minutos completados en ventanas de 7 días (esta semana vs la anterior). */
  tiempo_delta_pct: number | null;
  /** Minutos totales en la rutina anterior guardada (misma métrica que `tiempo_total`). */
  tiempo_routine_anterior_min: number | null;
  /** % de cambio vs esa rutina anterior; null si no hay rutina previa o min previos = 0. */
  tiempo_delta_vs_routine_anterior_pct: number | null;

  intensidad: Intensity;
};
