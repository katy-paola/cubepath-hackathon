import { Intensity } from "./training";

export type Progress = {
  consistencia: {
    completados: number;
    total: number;
  };

  tiempo_total: number;

  intensidad_promedio: Intensity;
};
