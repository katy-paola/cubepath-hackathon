import { EnergyLevel, Location, Health } from "./config";

export type DailyAdjustment = {
  energia: EnergyLevel;
  tiempo_disponible: number;
  lugar?: Location;
  molestias?: Health;
};