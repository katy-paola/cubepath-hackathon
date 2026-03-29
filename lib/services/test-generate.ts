import { generateRoutine } from "./index";
import { RoutineConfig } from "@/lib/types";

const config: RoutineConfig = {
  objetivo: "resistencia",
  nivel: "principiante",
  frecuencia_semanal: 3,
  tiempo_sesion: 30,
  lugar_entrenamiento: "exterior",
  compromiso: "medio",
  salud_limitaciones: "nada",
};

const routine = generateRoutine(config);

console.log(routine);
