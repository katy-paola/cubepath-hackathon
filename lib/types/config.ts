import {
  COMMITMENT_VALUES,
  FREQUENCY_VALUES,
  GOAL_VALUES,
  HEALTH_LIMITATIONS_VALUES,
  LEVEL_VALUES,
  LOCATION_VALUES,
  SESSION_TIME_VALUES,
} from "./shared";

export type Goal = (typeof GOAL_VALUES)[number];
export type Level = (typeof LEVEL_VALUES)[number];
export type Frequency = (typeof FREQUENCY_VALUES)[number];
export type SessionTime = (typeof SESSION_TIME_VALUES)[number];
export type Location = (typeof LOCATION_VALUES)[number];
export type Commitment = (typeof COMMITMENT_VALUES)[number];
export type HealthLimitation = (typeof HEALTH_LIMITATIONS_VALUES)[number];
export type UserHealthLimitations = HealthLimitation[];

export type RoutineConfig = {
  objetivo: Goal;
  nivel: Level;
  frecuencia_semanal: Frequency;
  tiempo_sesion: SessionTime;
  lugar_entrenamiento: Location;
  compromiso: Commitment;
  salud_limitaciones?: UserHealthLimitations;
};
