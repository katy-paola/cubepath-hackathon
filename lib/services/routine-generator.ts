import { RoutineConfig, Routine, TrainingDay, TrainingType } from "@/lib/types";

export function generateRoutine(config: RoutineConfig): Routine {
  const dias: TrainingDay[] = [];

  const plan = getTrainingPlan(config.objetivo);

  for (let i = 0; i < config.frecuencia_semanal; i++) {
    dias.push({
      dia: i + 1,
      tipo: plan[i % plan.length],
      intensidad: getIntensity(config.nivel),
      ejercicios: getExercises(plan[i % plan.length]),
      razon: getReason(plan[i % plan.length]),
      estado: "pendiente",
    });
  }

  return {
    id: crypto.randomUUID(),
    config,
    dias,
    createdAt: new Date(),
  };
}

function getIntensity(level: RoutineConfig["nivel"]) {
  if (level === "principiante") return "baja";
  if (level === "intermedio") return "media";
  return "alta";
}

function getTrainingPlan(goal: RoutineConfig["objetivo"]): TrainingType[] {
  if (goal === "resistencia") {
    return [
      "resistencia",
      "resistencia",
      "velocidad",
      "resistencia",
    ] as TrainingType[];
  }

  if (goal === "velocidad") {
    return [
      "velocidad",
      "resistencia",
      "velocidad",
      "fuerza",
    ] as TrainingType[];
  }

  if (goal === "bajar_grasa") {
    return [
      "resistencia",
      "fuerza",
      "resistencia",
      "velocidad",
    ] as TrainingType[];
  }

  // tecnica
  return ["tecnica", "resistencia", "velocidad", "tecnica"] as TrainingType[];
}

function getReason(tipo: TrainingType) {
  if (tipo === "resistencia") {
    return "Mejora tu base aeróbica y resistencia general";
  }

  if (tipo === "velocidad") {
    return "Aumenta tu velocidad y capacidad anaeróbica";
  }

  if (tipo === "fuerza") {
    return "Fortalece músculos clave para correr mejor";
  }

  return "Mejora tu técnica de carrera";
}

function getExercises(tipo: TrainingType) {
  if (tipo === "resistencia") {
    return [
      {
        nombre: "Trote suave",
        duracion: 20,
        descripcion:
          "Corre a un ritmo cómodo. Mantén la espalda recta, balancea los brazos suavemente, respira de manera constante y evita encorvarte.",
      },
      {
        nombre: "Estiramientos finales",
        duracion: 10,
        descripcion:
          "Estira piernas, brazos y espalda suavemente durante 5-10 minutos para prevenir lesiones. Mantén cada estiramiento 20-30 segundos.",
      },
    ];
  }

  if (tipo === "velocidad") {
    return [
      {
        nombre: "Intervalos",
        duracion: 15,
        descripcion:
          "Alterna sprints de alta intensidad con periodos de recuperación caminando o trotando lento. Mantén tronco recto y pies firmes al aterrizar.",
      },
      {
        nombre: "Trote de enfriamiento",
        duracion: 5,
        descripcion:
          "Trote muy suave para reducir gradualmente la frecuencia cardíaca, relajando hombros y brazos.",
      },
    ];
  }

  if (tipo === "fuerza") {
    return [
      {
        nombre: "Sentadillas",
        repeticiones: 12,
        descripcion:
          "Mantén la espalda recta, baja lentamente hasta que los muslos estén paralelos al suelo y sube controladamente. Evita que las rodillas se proyecten hacia adelante.",
      },
      {
        nombre: "Plancha",
        duracion: 30,
        descripcion:
          "Apoya antebrazos y pies en el suelo. Mantén el cuerpo recto desde la cabeza hasta los pies, contrayendo abdomen y glúteos.",
      },
    ];
  }

  // tecnica
  return [
    {
      nombre: "Drills de técnica",
      duracion: 10,
      descripcion:
        "Ejercicios para mejorar la forma de carrera: elevación de rodillas, talones al glúteo y zancadas dinámicas. Mantén buena postura y controla el ritmo.",
    },
  ];
}
