import type { RoutineConfig } from "@/lib/types";

import type { RoutineConfigSchemaType } from "@/lib/validations/config";

export type RoutineFormValues = {
  objective: string;
  level: string;
  frequency: string;
  sessionTime: string;
  location: string;
  commitment: string;
  health: string;
};

const objectiveMap: Record<string, RoutineConfigSchemaType["objetivo"]> = {
  Resistencia: "resistencia",
  Velocidad: "velocidad",
  Potencia: "general",
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
  Interior: "cinta",
};

const commitmentMap: Record<string, RoutineConfigSchemaType["compromiso"]> = {
  Bajo: "bajo",
  Medio: "medio",
  Alto: "alto",
};

const healthMap: Record<
  string,
  RoutineConfigSchemaType["salud_limitaciones"] | undefined
> = {
  Nada: undefined,
  Molestias: ["molestias_leves"],
  "Lesiones previas": ["lesion_cronica"],
};

const sessionTimeMap: Record<string, RoutineConfigSchemaType["tiempo_sesion"]> =
  {
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
  general: "Potencia",
  perder_peso: "Resistencia",
  "5k": "Resistencia",
  "10k": "Resistencia",
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
  cinta: "Interior",
  casa_sin_equipo: "Interior",
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
  20: "30 min",
  30: "30 min",
  45: "45 min",
  60: "60 min",
  75: "75 min",
};

export function frequencyLabelToNumber(label: string): number {
  return frequencyMap[label as keyof typeof frequencyMap] ?? 3;
}

/** Opciones de frecuencia cuya cifra es >= días actuales de la rutina (no permitir bajar). */
export function routineFrequencyOptionsForMinDays(
  minDays: number,
): readonly string[] {
  const floor = Math.min(Math.max(minDays, 2), 5);
  const opts = (
    ["2 días", "3 días", "4 días", "5 días", "6 días"] as const
  ).filter((opt) => frequencyLabelToNumber(opt) >= floor);
  return opts.length > 0 ? opts : (["6 días"] as const);
}

export function mapRoutineConfigToFormValues(
  config: RoutineConfig,
): RoutineFormValues {
  const health: RoutineFormValues["health"] = !config.salud_limitaciones?.length
    ? "Nada"
    : config.salud_limitaciones.includes("lesion_cronica")
      ? "Lesiones previas"
      : "Molestias";

  return {
    objective: reverseObjective[config.objetivo] ?? "Resistencia",
    level: reverseLevel[config.nivel] ?? "Principiante",
    frequency: reverseFrequency[config.frecuencia_semanal] ?? "3 días",
    sessionTime: reverseSessionTime[config.tiempo_sesion] ?? "45 min",
    location: reverseLocation[config.lugar_entrenamiento] ?? "Exterior",
    commitment: reverseCommitment[config.compromiso] ?? "Medio",
    health,
  };
}

export function mapRoutineFormToConfig(
  values: RoutineFormValues,
): RoutineConfigSchemaType {
  return {
    objetivo: objectiveMap[values.objective] ?? "general",
    nivel: levelMap[values.level] ?? "principiante",
    frecuencia_semanal: frequencyMap[values.frequency] ?? 3,
    tiempo_sesion: sessionTimeMap[values.sessionTime] ?? 45,
    lugar_entrenamiento: locationMap[values.location] ?? "exterior",
    compromiso: commitmentMap[values.commitment] ?? "medio",
    salud_limitaciones: healthMap[values.health],
  };
}
