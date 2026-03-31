import type { RoutineConfigSchemaType } from "@/lib/validations/config";

type RoutineFormValues = {
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

const locationMap: Record<string, RoutineConfigSchemaType["lugar_entrenamiento"]> = {
  Exterior: "exterior",
  Interior: "cinta",
};

const commitmentMap: Record<string, RoutineConfigSchemaType["compromiso"]> = {
  Bajo: "bajo",
  Medio: "medio",
  Alto: "alto",
};

const healthMap: Record<string, RoutineConfigSchemaType["salud_limitaciones"] | undefined> = {
  Nada: undefined,
  Molestias: ["molestias_leves"],
  "Lesiones previas": ["lesion_cronica"],
};

const sessionTimeMap: Record<string, RoutineConfigSchemaType["tiempo_sesion"]> = {
  "30 min": 30,
  "45 min": 45,
  "60 min": 60,
  "75 min": 60,
};

const frequencyMap: Record<string, RoutineConfigSchemaType["frecuencia_semanal"]> = {
  "2 días": 2,
  "3 días": 3,
  "4 días": 4,
  "5 días": 5,
};

export function mapRoutineFormToConfig(values: RoutineFormValues): RoutineConfigSchemaType {
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
