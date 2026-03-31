// lib/runDailyFact.ts
import { getDailyFact } from "./getDailyFact";

export function runDailyFact() {
  const today = new Date().toISOString().split("T")[0];
  const lastRun = localStorage.getItem("dailyFactDate");

  if (lastRun !== today) {
    const fact = getDailyFact();

    localStorage.setItem("dailyFact", JSON.stringify(fact));
    localStorage.setItem("dailyFactDate", today);
  }
}
