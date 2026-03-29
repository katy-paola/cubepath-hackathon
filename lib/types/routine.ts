import { RoutineConfig } from "./config";
import { TrainingDay } from "./training";

export type Routine = {
  id: string;
  config: RoutineConfig;
  dias: TrainingDay[];
  createdAt: Date;
};
