import { z } from "zod";
import { RoutineConfigSchema } from "./config";

// Schema para actualización: todo opcional
export const UpdateRoutineSchema = RoutineConfigSchema.partial();

// inferred type
export type UpdateRoutineSchemaType = z.infer<typeof UpdateRoutineSchema>;
