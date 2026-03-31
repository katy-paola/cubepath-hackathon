/**
 * Etiquetas de UI alineadas con `lib/types/shared/config.ts` (GOAL_VALUES, etc.).
 * Un solo lugar (KISS) para “Configura tu rutina”, “Reajusta” y defaults.
 */
import type { HealthLimitation } from "@/lib/types/config";
import { ENERGY_LEVEL_VALUES } from "@/lib/types/shared/adjustments";
import {
  COMMITMENT_VALUES,
  GOAL_VALUES,
  HEALTH_LIMITATIONS_VALUES,
  LEVEL_VALUES,
  LOCATION_VALUES,
  SESSION_TIME_VALUES,
} from "@/lib/types/shared/config";

/** Objetivo: orden igual que GOAL_VALUES. */
const GOAL_LABELS: Record<(typeof GOAL_VALUES)[number], string> = {
  resistencia: "Resistencia",
  velocidad: "Velocidad",
  perder_peso: "Perder peso",
  "5k": "5K",
  "10k": "10K",
  general: "General",
};

export const routineObjectiveOptions = [
  GOAL_LABELS.resistencia,
  GOAL_LABELS.velocidad,
  GOAL_LABELS.perder_peso,
  GOAL_LABELS["5k"],
  GOAL_LABELS["10k"],
  GOAL_LABELS.general,
] as const;

const LEVEL_LABELS: Record<(typeof LEVEL_VALUES)[number], string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const routineLevelOptions = [
  LEVEL_LABELS.principiante,
  LEVEL_LABELS.intermedio,
  LEVEL_LABELS.avanzado,
] as const;

export const routineFrequencyOptions = [
  "2 días",
  "3 días",
  "4 días",
  "5 días",
  "6 días",
] as const;

const SESSION_LABELS: Record<(typeof SESSION_TIME_VALUES)[number], string> = {
  20: "20 min",
  30: "30 min",
  45: "45 min",
  60: "60 min",
  75: "75 min",
};

export const routineSessionTimeOptions = [
  SESSION_LABELS[20],
  SESSION_LABELS[30],
  SESSION_LABELS[45],
  SESSION_LABELS[60],
  SESSION_LABELS[75],
] as const;

const LOCATION_LABELS: Record<(typeof LOCATION_VALUES)[number], string> = {
  exterior: "Exterior",
  cinta: "Cinta",
  casa_sin_equipo: "Casa sin equipo",
};

export const routineLocationOptions = [
  LOCATION_LABELS.exterior,
  LOCATION_LABELS.cinta,
  LOCATION_LABELS.casa_sin_equipo,
] as const;

const COMMITMENT_LABELS: Record<(typeof COMMITMENT_VALUES)[number], string> = {
  bajo: "Bajo",
  medio: "Medio",
  alto: "Alto",
};

export const routineCommitmentOptions = [
  COMMITMENT_LABELS.bajo,
  COMMITMENT_LABELS.medio,
  COMMITMENT_LABELS.alto,
] as const;

const HEALTH_LABELS: Record<
  (typeof HEALTH_LIMITATIONS_VALUES)[number],
  string
> = {
  molestias_leves: "Molestias leves",
  lesion_cronica: "Lesión crónica",
  condicion_cardiaca: "Condición cardiaca",
  condicion_respiratoria: "Condición respiratoria",
};

export const routineHealthNingunaLabel = "Ninguna" as const;

/** Orden del modal / chips (mismo que `HEALTH_LIMITATIONS_VALUES`). */
export const routineHealthLimitationCodesOrdered = [
  ...HEALTH_LIMITATIONS_VALUES,
] as const satisfies readonly HealthLimitation[];

export function routineHealthLimitationLabel(code: HealthLimitation): string {
  return HEALTH_LABELS[code];
}

export const routineFormDefaults = {
  objective: GOAL_LABELS.resistencia,
  level: LEVEL_LABELS.principiante,
  frequency: "3 días",
  sessionTime: SESSION_LABELS[45],
  location: LOCATION_LABELS.exterior,
  commitment: COMMITMENT_LABELS.medio,
  health: [] satisfies HealthLimitation[],
} as const;

/** “Adaptar hoy”: energía = `ENERGY_LEVEL_VALUES` / `DailyAdjustment.energia`. */
export const adjustDayEnergyOptions = ENERGY_LEVEL_VALUES;

/** “Adaptar hoy”: tiempos compactos para el select. */
export const adjustDayTimeOptions = [
  "20min",
  "30min",
  "45min",
  "60min",
  "75min",
] as const;

export const adjustDayLocationOptions = routineLocationOptions;

/** “Adaptar hoy”: incluye Ninguna + las cuatro limitaciones (select simple). */
export const adjustDayDiscomfortOptions = [
  routineHealthNingunaLabel,
  HEALTH_LABELS.molestias_leves,
  HEALTH_LABELS.lesion_cronica,
  HEALTH_LABELS.condicion_cardiaca,
  HEALTH_LABELS.condicion_respiratoria,
] as const;
