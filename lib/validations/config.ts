import { z } from "zod";
import {
  COMMITMENT_VALUES,
  FREQUENCY_VALUES,
  GOAL_VALUES,
  HEALTH_LIMITATIONS_VALUES,
  LEVEL_VALUES,
  LOCATION_VALUES,
  SESSION_TIME_VALUES,
} from "@/lib/types/shared";

// helpers
const stringEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values);

const numberEnum = <T extends readonly number[]>(values: T) =>
  z.union(
    values.map((v) => z.literal(v)) as [
      z.ZodLiteral<T[number]>,
      ...z.ZodLiteral<T[number]>[],
    ],
  );

// schemas
export const GoalSchema = stringEnum(GOAL_VALUES);
export const LevelSchema = stringEnum(LEVEL_VALUES);
export const LocationSchema = stringEnum(LOCATION_VALUES);
export const CommitmentSchema = stringEnum(COMMITMENT_VALUES);
export const HealthLimitationSchema = stringEnum(HEALTH_LIMITATIONS_VALUES);

export const SessionTimeSchema = numberEnum(SESSION_TIME_VALUES);
export const FrequencySchema = numberEnum(FREQUENCY_VALUES);

// main schema
export const RoutineConfigSchema = z.object({
  objetivo: GoalSchema,
  nivel: LevelSchema,
  frecuencia_semanal: FrequencySchema,
  tiempo_sesion: SessionTimeSchema,
  lugar_entrenamiento: LocationSchema,
  compromiso: CommitmentSchema,
  salud_limitaciones: z.array(HealthLimitationSchema).optional(),
});

// inferred type
export type RoutineConfigSchemaType = z.infer<typeof RoutineConfigSchema>;
