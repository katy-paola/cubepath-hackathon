import type { DailyAdjustment } from "@/lib/types/adjustments";
import { ENERGY_LEVEL_VALUES } from "@/lib/types/shared/adjustments";
import type { SessionTime } from "@/lib/types/config";

const lugarByLabel: Record<string, NonNullable<DailyAdjustment["lugar"]>> = {
  Exterior: "exterior",
  Cinta: "cinta",
  "Casa sin equipo": "casa_sin_equipo",
};

export function mapAdjustDayFormToAdjustment(values: {
  energy: string;
  time: string;
  location: string;
  discomfort: string;
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

  let salud_limitaciones: DailyAdjustment["salud_limitaciones"];
  if (values.discomfort === "Ninguna") {
    salud_limitaciones = undefined;
  } else if (values.discomfort === "Molestias leves") {
    salud_limitaciones = ["molestias_leves"];
  } else if (values.discomfort === "Lesión crónica") {
    salud_limitaciones = ["lesion_cronica"];
  } else if (values.discomfort === "Condición cardiaca") {
    salud_limitaciones = ["condicion_cardiaca"];
  } else if (values.discomfort === "Condición respiratoria") {
    salud_limitaciones = ["condicion_respiratoria"];
  } else {
    salud_limitaciones = undefined;
  }

  return {
    energia,
    tiempo_sesion,
    lugar,
    salud_limitaciones,
  };
}
