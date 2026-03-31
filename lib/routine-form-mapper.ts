import type { RoutineConfig } from "@/lib/types";
import type { HealthLimitation } from "@/lib/types/config";
import { HEALTH_LIMITATIONS_VALUES } from "@/lib/types/shared/config";

import type { RoutineConfigSchemaType } from "@/lib/validations/config";
import { routineFrequencyOptions } from "@/lib/routine-form-options";

export type RoutineFormValues = {
  objective: string;
  level: string;
  frequency: string;
  sessionTime: string;
  location: string;
  commitment: string;
  /** Códigos en orden estable; vacío = sin limitaciones. */
  health: HealthLimitation[];
};

const objectiveMap: Record<string, RoutineConfigSchemaType["objetivo"]> = {
  Resistencia: "resistencia",
  Velocidad: "velocidad",
  "Perder peso": "perder_peso",
  "5K": "5k",
  "10K": "10k",
  General: "general",
};

const levelMap: Record<string, RoutineConfigSchemaType["nivel"]> = {
  Principiante: "principiante",
  Intermedio: "intermedio",
  Avanzado: "avanzado",
};

const locationMap: Record<
  string,
  RoutineConfigSchemaType["lugar_entrenamiento"]
> = {
  Exterior: "exterior",
  Cinta: "cinta",
  "Casa sin equipo": "casa_sin_equipo",
};

const commitmentMap: Record<string, RoutineConfigSchemaType["compromiso"]> = {
  Bajo: "bajo",
  Medio: "medio",
  Alto: "alto",
};

const sessionTimeMap: Record<string, RoutineConfigSchemaType["tiempo_sesion"]> =
  {
    "20 min": 20,
    "30 min": 30,
    "45 min": 45,
    "60 min": 60,
    "75 min": 75,
  };

const frequencyMap: Record<
  string,
  RoutineConfigSchemaType["frecuencia_semanal"]
> = {
  "2 días": 2,
  "3 días": 3,
  "4 días": 4,
  "5 días": 5,
  "6 días": 6,
};

const reverseObjective: Record<
  RoutineConfig["objetivo"],
  RoutineFormValues["objective"]
> = {
  resistencia: "Resistencia",
  velocidad: "Velocidad",
  perder_peso: "Perder peso",
  "5k": "5K",
  "10k": "10K",
  general: "General",
};

const reverseLevel: Record<RoutineConfig["nivel"], RoutineFormValues["level"]> =
  {
    principiante: "Principiante",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };

const reverseLocation: Record<
  RoutineConfig["lugar_entrenamiento"],
  RoutineFormValues["location"]
> = {
  exterior: "Exterior",
  cinta: "Cinta",
  casa_sin_equipo: "Casa sin equipo",
};

const reverseCommitment: Record<
  RoutineConfig["compromiso"],
  RoutineFormValues["commitment"]
> = {
  bajo: "Bajo",
  medio: "Medio",
  alto: "Alto",
};

const reverseFrequency: Record<number, RoutineFormValues["frequency"]> = {
  2: "2 días",
  3: "3 días",
  4: "4 días",
  5: "5 días",
  6: "6 días",
};

const reverseSessionTime: Record<number, RoutineFormValues["sessionTime"]> = {
  20: "20 min",
  30: "30 min",
  45: "45 min",
  60: "60 min",
  75: "75 min",
};

/** Orden estable para UI y payload (coincide con HEALTH_LIMITATIONS_VALUES). */
export function normalizeHealthLimitations(
  selected: readonly HealthLimitation[],
): HealthLimitation[] {
  return [...HEALTH_LIMITATIONS_VALUES].filter((c) => selected.includes(c));
}

function mapSaludToFormHealth(
  salud: RoutineConfig["salud_limitaciones"],
): RoutineFormValues["health"] {
  if (!salud?.length) return [];
  return normalizeHealthLimitations(salud);
}

export function frequencyLabelToNumber(label: string): number {
  return frequencyMap[label as keyof typeof frequencyMap] ?? 3;
}

/** Opciones de frecuencia cuya cifra es >= días actuales de la rutina (no permitir bajar). */
export function routineFrequencyOptionsForMinDays(
  minDays: number,
): readonly string[] {
  const floor = Math.min(Math.max(minDays, 2), 6);
  const opts = [...routineFrequencyOptions].filter(
    (opt) => frequencyLabelToNumber(opt) >= floor,
  );
  return opts.length > 0 ? opts : (["6 días"] as const);
}

export function mapRoutineConfigToFormValues(
  config: RoutineConfig,
): RoutineFormValues {
  return {
    objective: reverseObjective[config.objetivo] ?? "Resistencia",
    level: reverseLevel[config.nivel] ?? "Principiante",
    frequency: reverseFrequency[config.frecuencia_semanal] ?? "3 días",
    sessionTime: reverseSessionTime[config.tiempo_sesion] ?? "45 min",
    location: reverseLocation[config.lugar_entrenamiento] ?? "Exterior",
    commitment: reverseCommitment[config.compromiso] ?? "Medio",
    health: mapSaludToFormHealth(config.salud_limitaciones),
  };
}

export function mapRoutineFormToConfig(
  values: RoutineFormValues,
): RoutineConfigSchemaType {
  const salud = normalizeHealthLimitations(values.health);
  return {
    objetivo: objectiveMap[values.objective] ?? "general",
    nivel: levelMap[values.level] ?? "principiante",
    frecuencia_semanal: frequencyMap[values.frequency] ?? 3,
    tiempo_sesion: sessionTimeMap[values.sessionTime] ?? 45,
    lugar_entrenamiento: locationMap[values.location] ?? "exterior",
    compromiso: commitmentMap[values.commitment] ?? "medio",
    salud_limitaciones: salud.length > 0 ? salud : undefined,
  };
}
