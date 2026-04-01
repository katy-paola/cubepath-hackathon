import type { DailyAdjustment } from "@/lib/types/adjustments";
import { normalizeHealthLimitations } from "@/lib/routine-form-mapper";
import { ENERGY_LEVEL_VALUES } from "@/lib/types/shared/adjustments";
import type { HealthLimitation, SessionTime } from "@/lib/types/config";

const lugarByLabel: Record<string, NonNullable<DailyAdjustment["lugar"]>> = {
  Exterior: "exterior",
  Cinta: "cinta",
  "Casa sin equipo": "casa_sin_equipo",
};

export function mapAdjustDayFormToAdjustment(values: {
  energy: string;
  time: string;
  location: string;
  discomfort: HealthLimitation[];
}): DailyAdjustment {
  const energia = ENERGY_LEVEL_VALUES.includes(
    values.energy as (typeof ENERGY_LEVEL_VALUES)[number],
  )
    ? (values.energy as (typeof ENERGY_LEVEL_VALUES)[number])
    : "media";

  const tiempoMap: Record<string, SessionTime> = {
    "20min": 20,
    "30min": 30,
    "45min": 45,
    "60min": 60,
    "75min": 75,
  };
  const tiempo_sesion = tiempoMap[values.time] ?? 45;

  const lugar = lugarByLabel[values.location] ?? "exterior";

  const salud = normalizeHealthLimitations(values.discomfort);
  const salud_limitaciones: DailyAdjustment["salud_limitaciones"] =
    salud.length > 0 ? salud : undefined;

  return {
    energia,
    tiempo_sesion,
    lugar,
    salud_limitaciones,
  };
}
