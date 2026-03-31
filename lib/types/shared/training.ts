export const TRAINING_TYPE_VALUES = [
  "suave",
  "largo",
  "intervalos",
  "tempo",
  "fartlek",
  "recuperacion",
  "cruzado",
  "fuerza",
  "descanso",
] as const;

/*
  El valor se usará para calcular la intensidad de la rutina tomando la que más se repite o el promedio si son iguales
 */
export const INTENSITY_VALUES = [
  {
    valor: 1,
    nivel: "baja",
  },
  {
    valor: 2,
    nivel: "media",
  },
  {
    valor: 3,
    nivel: "alta",
  },
] as const;

/*
  Un día "por_completar" se refiere a:
  - El primero de la rutina si ninguno se ha marcado como "completado"
  - El siguiente después del último día marcado como "completado"
  Para los días siguientes a este, el estado siempre será "pendiente"
*/
export const STATUS_VALUES = [
  "pendiente",
  "por_completar",
  "completado",
] as const;
