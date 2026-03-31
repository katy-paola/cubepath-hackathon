import { Location, UserHealthLimitations, SessionTime } from "./config";
import { ENERGY_LEVEL_VALUES } from "./shared";

export type EnergyLevel = (typeof ENERGY_LEVEL_VALUES)[number];

export type DailyAdjustment = {
  energia?: EnergyLevel;
  tiempo_sesion?: SessionTime;
  lugar?: Location;
  salud_limitaciones?: UserHealthLimitations;
};
