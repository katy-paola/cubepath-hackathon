import { RoutineConfig, Routine, TrainingDay, TrainingType } from "@/lib/types";

export function generateRoutine(config: RoutineConfig): Routine {
  const dias: TrainingDay[] = [];

  const plan = getTrainingPlan(config.objetivo);

  for (let i = 0; i < config.frecuencia_semanal; i++) {
    dias.push({
      numero_dia: i + 1,
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
      "suave",
      "largo",
      "intervalos",
      "suave",
    ];
  }

  if (goal === "velocidad") {
    return [
      "intervalos",
      "suave",
      "tempo",
      "fuerza",
    ];
  }

  if (goal === "perder_peso") {
    return [
      "suave",
      "fuerza",
      "cruzado",
      "largo",
    ];
  }

  if (goal === "5k") {
    return ["intervalos", "suave", "tempo", "recuperacion"];
  }

  if (goal === "10k") {
    return ["tempo", "suave", "largo", "recuperacion"];
  }

  // general
  return ["suave", "fuerza", "tempo", "descanso"];
}

function getReason(tipo: TrainingType) {
  if (tipo === "suave") return "Construye base aeróbica con bajo estrés y buena técnica.";
  if (tipo === "largo") return "Mejora la resistencia y la tolerancia al volumen progresivamente.";
  if (tipo === "intervalos") return "Desarrolla velocidad y capacidad anaeróbica con repeticiones controladas.";
  if (tipo === "tempo") return "Sube tu umbral y mejora el ritmo sostenible.";
  if (tipo === "fartlek") return "Mejora cambios de ritmo de forma flexible y divertida.";
  if (tipo === "recuperacion") return "Facilita la recuperación y suma volumen suave sin sobrecargar.";
  if (tipo === "cruzado") return "Mantén condición cardiovascular reduciendo impacto articular.";
  if (tipo === "fuerza") return "Fortalece músculos y tendones para correr mejor y prevenir lesiones.";
  return "Descanso para asimilar el entrenamiento y reducir riesgo de lesión.";
}

function getExercises(tipo: TrainingType) {
  if (tipo === "suave") {
    return [
      {
        nombre: "Trote suave (Zona 2)",
        duracion: 25,
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

  if (tipo === "largo") {
    return [
      {
        nombre: "Rodaje largo",
        duracion: 45,
        descripcion:
          "Corre continuo a ritmo cómodo. Mantén el esfuerzo estable, hidrátate si es necesario y cuida la técnica cuando aparezca la fatiga.",
      },
      {
        nombre: "Enfriamiento + movilidad",
        duracion: 10,
        descripcion:
          "Trote muy suave y luego movilidad básica de tobillos, cadera y estiramientos ligeros.",
      },
    ];
  }

  if (tipo === "intervalos") {
    return [
      {
        nombre: "Calentamiento",
        duracion: 10,
        descripcion:
          "Trote suave + movilidad. Añade 3 aceleraciones cortas para preparar el cuerpo.",
      },
      {
        nombre: "Intervalos",
        duracion: 15,
        descripcion:
          "Alterna esfuerzos rápidos con recuperación trotando suave. Mantén postura alta y zancada controlada.",
      },
      {
        nombre: "Enfriamiento",
        duracion: 8,
        descripcion:
          "Trote muy suave para bajar pulsaciones y soltar piernas.",
      },
    ];
  }

  if (tipo === "tempo") {
    return [
      {
        nombre: "Calentamiento",
        duracion: 10,
        descripcion:
          "Trote suave + movilidad. Respira profundo y mantén hombros relajados.",
      },
      {
        nombre: "Bloque tempo",
        duracion: 15,
        descripcion:
          "Ritmo exigente pero sostenible (hablas en frases cortas). Mantén cadencia estable y técnica limpia.",
      },
      {
        nombre: "Enfriamiento",
        duracion: 8,
        descripcion:
          "Trote suave y estiramientos ligeros.",
      },
    ];
  }

  if (tipo === "fartlek") {
    return [
      {
        nombre: "Calentamiento",
        duracion: 10,
        descripcion: "Trote suave + movilidad. Prepara respiración y postura.",
      },
      {
        nombre: "Fartlek",
        duracion: 18,
        descripcion:
          "Alterna cambios de ritmo por sensaciones (ej. 1 min rápido / 2 min suave). Controla la técnica en los tramos rápidos.",
      },
      {
        nombre: "Enfriamiento",
        duracion: 7,
        descripcion: "Trote suave para recuperar.",
      },
    ];
  }

  if (tipo === "recuperacion") {
    return [
      {
        nombre: "Trote de recuperación",
        duracion: 20,
        descripcion:
          "Muy suave, sin forzar. Prioriza respiración nasal si puedes y técnica relajada.",
      },
      {
        nombre: "Movilidad",
        duracion: 10,
        descripcion:
          "Movilidad de cadera, tobillos y estiramientos ligeros. Sin dolor.",
      },
    ];
  }

  if (tipo === "cruzado") {
    return [
      {
        nombre: "Cardio cruzado",
        duracion: 30,
        descripcion:
          "Bici estática/elíptica a ritmo moderado. Mantén una cadencia constante sin impacto.",
      },
      {
        nombre: "Core ligero",
        duracion: 10,
        descripcion:
          "Plancha, dead bug o puente de glúteo con control. Prioriza técnica.",
      },
    ];
  }

  if (tipo === "fuerza") {
    return [
      {
        nombre: "Sentadillas",
        duracion: 15,
        descripcion:
          "Mantén la espalda recta, baja lentamente hasta que los muslos estén paralelos al suelo y sube controladamente. Evita que las rodillas se proyecten hacia adelante.",
      },
      {
        nombre: "Plancha",
        duracion: 15,
        descripcion:
          "Apoya antebrazos y pies en el suelo. Mantén el cuerpo recto desde la cabeza hasta los pies, contrayendo abdomen y glúteos.",
      },
    ];
  }

  // descanso
  return [
    {
      nombre: "Descanso",
      duracion: 0,
      descripcion:
        "Recupera: sueño, hidratación y una caminata suave opcional si te sienta bien.",
    },
  ];
}
