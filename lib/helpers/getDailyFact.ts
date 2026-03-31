import { DAILY_FACT_LIST } from "../consts/daily-fact-list";

export function getDailyFact() {
  const today = new Date();

  // Calculamos el día del año (1 a 365/366)
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Usamos módulo para rotar entre los 100 datos
  const index = dayOfYear % DAILY_FACT_LIST.length;

  return DAILY_FACT_LIST[index];
}
