import type { DailyAdjustment } from "@/lib/types/adjustments";
import type { SessionTime } from "@/lib/types/config";

export function mapAdjustDayFormToAdjustment(values: {
  energy: string;
  time: string;
  location: string;
  discomfort: string;
}): DailyAdjustment {
  const energia =
    values.energy === "Baja"
      ? "baja"
      : values.energy === "Alta"
        ? "alta"
        : "media";

  const tiempoMap: Record<string, SessionTime> = {
    "30min": 30,
    "45min": 45,
    "60min": 60,
    "75min": 75,
  };
  const tiempo_sesion = tiempoMap[values.time] ?? 30;

  const lugar = values.location === "Interior" ? "cinta" : "exterior";

  let salud_limitaciones: DailyAdjustment["salud_limitaciones"];
  if (values.discomfort === "Molestias leves") {
    salud_limitaciones = ["molestias_leves"];
  } else if (values.discomfort === "Molestias moderadas") {
    salud_limitaciones = ["molestias_leves"];
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
