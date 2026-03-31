import {
  INTENSITY_VALUES,
  STATUS_VALUES,
  TRAINING_TYPE_VALUES,
} from "./shared";

export type TrainingType = (typeof TRAINING_TYPE_VALUES)[number];
export type Intensity = (typeof INTENSITY_VALUES)[number];
export type Status = (typeof STATUS_VALUES)[number];

export type Exercise = {
  nombre: string;
  duracion: number;
  descripcion: string;
};

export type TrainingDay = {
  numero_dia: number;
  tipo: TrainingType;
  intensidad: Intensity["nivel"];
  ejercicios: Exercise[];
  razon: string;
  estado: Status;
};
