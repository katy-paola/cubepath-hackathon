export type TrainingType =
  | "resistencia"
  | "velocidad"
  | "fuerza";

export type Intensity =
  | "baja"
  | "media"
  | "alta";

export type Exercise = {
  nombre: string;
  duracion?: number;
  repeticiones?: number;
  descripcion?: string;
};

export type TrainingDay = {
  dia: number;
  tipo: TrainingType;
  intensidad: Intensity;
  ejercicios: Exercise[];
  razon: string;

  estado: "pendiente" | "completado";
};