import { z } from "zod";
import { ENERGY_LEVEL_VALUES } from "../types/shared";
import {
  SessionTimeSchema,
  LocationSchema,
  HealthLimitationSchema,
} from "./config";

export const DailyAdjustmentSchema = z.object({
  energia: z.enum(ENERGY_LEVEL_VALUES).optional(),
  tiempo_sesion: SessionTimeSchema.optional(),
  lugar: LocationSchema.optional(),
  salud_limitaciones: z.array(HealthLimitationSchema).optional(),
});
