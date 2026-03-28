/**
 * Opciones y valores por defecto compartidos entre “Configura tu rutina” y “Reajusta”.
 * Un solo lugar (KISS) para no divergir listas ni defaults.
 */
export const routineObjectiveOptions = ["Resistencia", "Velocidad", "Potencia"] as const;
export const routineLevelOptions = ["Principiante", "Intermedio", "Avanzado"] as const;
export const routineFrequencyOptions = ["2 días", "3 días", "4 días", "5 días"] as const;
export const routineSessionTimeOptions = ["30 min", "45 min", "60 min", "75 min"] as const;
export const routineLocationOptions = ["Exterior", "Interior"] as const;
export const routineCommitmentOptions = ["Bajo", "Medio", "Alto"] as const;
export const routineHealthOptions = ["Nada", "Molestias", "Lesiones previas"] as const;

export const routineFormDefaults = {
  objective: "Resistencia",
  level: "Principiante",
  frequency: "3 días",
  sessionTime: "45 min",
  location: "Exterior",
  commitment: "Medio",
  health: "Nada",
} as const;
