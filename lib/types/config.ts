export type Goal =
  | "resistencia"
  | "velocidad"
  | "tecnica"
  | "bajar_grasa";

export type Level =
  | "principiante"
  | "intermedio"
  | "avanzado";

export type Frequency = 2 | 3 | 4 | 5;

export type SessionTime = 20 | 30 | 45 | 60;

export type Location =
  | "exterior"
  | "cinta"
  | "casa_sin_equipo";

export type EnergyLevel =
  | "baja"
  | "media"
  | "alta";

export type Commitment =
  | "bajo"
  | "medio"
  | "alto";

export type Health =
  | "nada"
  | "molestias_leves"
  | "lesion_cronica"
  | "condicion_cardiaca"
  | "condicion_respiratoria";

export type RoutineConfig = {
  objetivo: Goal;
  nivel: Level;
  frecuencia_semanal: Frequency;
  tiempo_sesion: SessionTime;
  lugar_entrenamiento: Location;
  compromiso: Commitment;
  salud_limitaciones: Health;
};