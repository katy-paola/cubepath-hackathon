import { z } from "zod";
import {
  INTENSITY_VALUES,
  TRAINING_TYPE_VALUES,
  STATUS_VALUES,
} from "@/lib/types/shared";

const stringEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values);

const intensityLevels = INTENSITY_VALUES.map((i) => i.nivel) as [
  (typeof INTENSITY_VALUES)[number]["nivel"],
  ...(typeof INTENSITY_VALUES)[number]["nivel"][],
];

export const IntensityLevelSchema = z.enum(intensityLevels);

export const TrainingTypeSchema = stringEnum(TRAINING_TYPE_VALUES);

export const StatusSchema = stringEnum(STATUS_VALUES);

export const ExerciseSchema = z.object({
  nombre: z.string().describe("Nombre corto del ejercicio"),
  duracion: z.number().int().positive().describe("Duración en minutos"),
  descripcion: z
    .string()
    .describe("Explicación breve de cómo hacer el ejercicio"),
});

export const AITrainingDaySchema = z.object({
  tipo: TrainingTypeSchema.describe("Tipo de entrenamiento del día"),
  intensidad: IntensityLevelSchema.describe("Nivel de intensidad"),
  ejercicios: z.array(ExerciseSchema).min(2),
  razon: z.string().max(200).describe("Por qué este entrenamiento es adecuado"),
});

export const AIRoutineSchema = z.array(AITrainingDaySchema).min(2).max(6);

export const TrainingDaySchema = AITrainingDaySchema.extend({
  numero_dia: z.number().int().min(1).max(6),
  estado: StatusSchema,
});

export type AITrainingDaySchemaType = z.infer<typeof AITrainingDaySchema>;
export type TrainingDaySchemaType = z.infer<typeof TrainingDaySchema>;
