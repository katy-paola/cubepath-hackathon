import { z } from "zod";
import { INTENSITY_VALUES, TRAINING_TYPE_VALUES } from "@/lib/types/shared";

const stringEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values);

const IntensityLevelSchema = stringEnum(
  INTENSITY_VALUES.map((i) => i.nivel) as [
    (typeof INTENSITY_VALUES)[number]["nivel"],
    ...(typeof INTENSITY_VALUES)[number]["nivel"][],
  ],
);

export const TrainingTypeSchema = stringEnum(TRAINING_TYPE_VALUES);

export const ExerciseSchema = z.object({
  nombre: z.string(),
  duracion: z.number(),
  descripcion: z.string(),
});

export const AITrainingDaySchema = z.object({
  tipo: TrainingTypeSchema,
  intensidad: IntensityLevelSchema,
  ejercicios: z.array(ExerciseSchema),
  razon: z.string(),
});

export const AIRoutineSchema = z.array(AITrainingDaySchema).min(2).max(6);

export const TrainingDaySchema = AITrainingDaySchema.extend({
  numero_dia: z.number(),
  estado: z.string(),
});

export type AITrainingDaySchemaType = z.infer<typeof AITrainingDaySchema>;
export type TrainingDaySchemaType = z.infer<typeof TrainingDaySchema>;
