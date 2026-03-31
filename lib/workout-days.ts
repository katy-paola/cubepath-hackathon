export type WorkoutDayStatus = "completed" | "pending";
export type WorkoutIntensity = "low" | "medium" | "high";

export type WorkoutExercise = {
  title: string;
  description: string;
  duration: string;
};

export type WorkoutDay = {
  slug: string;
  day: string;
  name: string;
  status: WorkoutDayStatus;
  borderClass?: string;
  statusLabel?: string;
  detailBorderClass?: string;
  detailStatusLabel?: string;
  intensity: WorkoutIntensity;
  intensityLabel: string;
  totalDuration: string;
  reason: string;
  showAdjustDay?: boolean;
  exercises: WorkoutExercise[];
};

export const workoutDays: WorkoutDay[] = [
  {
    slug: "dia-1",
    day: "Día 1",
    name: "Suave",
    status: "completed",
    borderClass: "border-success-border",
    statusLabel: "Completado",
    intensity: "medium",
    intensityLabel: "MODERADA",
    totalDuration: "30min",
    reason: "Control de ritmo constante para desarrollar base aeróbica",
    exercises: [
      {
        title: "Trote continuo suave",
        description: "Mantener cadencia estable y respiración controlada",
        duration: "20min",
      },
      {
        title: "Zancadas cortas",
        description: "Trabajar técnica de apoyo y elevación de rodilla",
        duration: "5min",
      },
      {
        title: "Caminata de recuperación",
        description: "Bajar pulsaciones gradualmente",
        duration: "5min",
      },
    ],
  },
  {
    slug: "dia-2",
    day: "Día 2",
    name: "Intervalos",
    status: "completed",
    borderClass: "border-success-border",
    statusLabel: "Completado",
    detailBorderClass: "border-[#63789c]",
    detailStatusLabel: "Completar día",
    intensity: "medium",
    intensityLabel: "MODERADA",
    totalDuration: "30min",
    reason:
      "Trabajo de velocidad para aumentar capacidad anaeróbica y eficiencia.",
    showAdjustDay: true,
    exercises: [
      {
        title: "Trote continuo suave",
        description: "Mantener cadencia estable y respiración controlada",
        duration: "20min",
      },
      {
        title: "Zancadas cortas",
        description: "Trabajar técnica de apoyo y elevación de rodilla",
        duration: "5min",
      },
      {
        title: "Caminata de recuperación",
        description: "Bajar pulsaciones gradualmente",
        duration: "5min",
      },
    ],
  },
  {
    slug: "dia-3",
    day: "Día 3",
    name: "Cruzado",
    status: "pending",
    borderClass: "border-[#63789c]",
    statusLabel: "Completar día",
    intensity: "medium",
    intensityLabel: "MODERADA",
    totalDuration: "35min",
    reason:
      "Sesión cruzada para mantener carga cardiovascular con menor impacto.",
    exercises: [
      {
        title: "Bicicleta o elíptica",
        description: "Mantener frecuencia estable sin impacto articular",
        duration: "25min",
      },
      {
        title: "Core y estabilidad",
        description: "Fortalecer zona media para mejorar técnica de carrera",
        duration: "10min",
      },
    ],
  },
  {
    slug: "dia-4",
    day: "Día 4",
    name: "Descanso",
    status: "pending",
    borderClass: "border-border",
    intensity: "low",
    intensityLabel: "BAJA",
    totalDuration: "0min",
    reason: "Recuperación para asimilar la carga y prevenir fatiga acumulada.",
    exercises: [
      {
        title: "Descanso activo opcional",
        description: "Caminata ligera y movilidad articular",
        duration: "20min",
      },
    ],
  },
];

export function getWorkoutDayBySlug(slug: string) {
  return workoutDays.find((day) => day.slug === slug);
}
