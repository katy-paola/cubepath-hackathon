import type { Progress, Routine, Status, TrainingDay } from "@/lib/types";
import { INTENSITY_VALUES } from "@/lib/types/shared/training";

import { db, type DayProgress, type StoredRoutine } from "./db";

const ROUTINE_UPDATED_EVENT = "stridia:routine-updated";

function notifyRoutineUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ROUTINE_UPDATED_EVENT));
}

export function onRoutineUpdated(handler: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(ROUTINE_UPDATED_EVENT, handler);
  return () => window.removeEventListener(ROUTINE_UPDATED_EVENT, handler);
}

function nowIso() {
  return new Date().toISOString();
}

function routineToStored(routine: Routine): StoredRoutine {
  return { ...routine, createdAt: routine.createdAt.toISOString() };
}

function storedToRoutine(stored: StoredRoutine): Routine {
  return { ...stored, createdAt: new Date(stored.createdAt) };
}

function getDefaultStatusForDayIndex(index: number) {
  return index === 0 ? ("por_completar" as const) : ("pendiente" as const);
}

function totalDurationMinutes(day: TrainingDay) {
  return day.ejercicios.reduce((acc, ex) => acc + (ex.duracion ?? 0), 0);
}

function totalMinutesCompletedInRoutine(r: Routine): number {
  return r.dias
    .filter((d) => d.estado === "completado")
    .reduce((acc, d) => acc + totalDurationMinutes(d), 0);
}

function parseIsoToMs(value?: string) {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export async function setActiveRoutine(routine: Routine) {
  const stored = routineToStored(routine);

  await db.transaction("rw", db.routines, db.dayProgress, db.meta, async () => {
    await db.routines.put(stored);
    await db.meta.put({ key: "activeRoutineId", value: stored.id });

    const days = stored.dias ?? [];
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const estado: Status = day.estado ?? getDefaultStatusForDayIndex(i);
      await db.dayProgress.put({
        routineId: stored.id,
        numero_dia: day.numero_dia,
        estado,
        updatedAt: nowIso(),
      });
    }
  });

  notifyRoutineUpdated();
}

export async function getActiveRoutineId() {
  const row = await db.meta.get("activeRoutineId");
  return row?.value ?? null;
}

export async function getActiveRoutine() {
  const id = await getActiveRoutineId();
  if (!id) return null;
  const stored = await db.routines.get(id);
  return stored ? storedToRoutine(stored) : null;
}

export async function clearActiveRoutine() {
  const id = await getActiveRoutineId();
  if (!id) return;

  await db.transaction("rw", db.routines, db.dayProgress, db.meta, async () => {
    await db.meta.delete("activeRoutineId");
    await db.routines.delete(id);
    await db.dayProgress.where("routineId").equals(id).delete();
  });

  notifyRoutineUpdated();
}

export async function resetActiveRoutineProgress() {
  const routine = await getActiveRoutine();
  if (!routine) return;

  await db.transaction("rw", db.routines, db.dayProgress, async () => {
    const storedRoutine = await db.routines.get(routine.id);
    if (!storedRoutine) return;

    const dias = storedRoutine.dias.map((d, idx) => ({
      ...d,
      estado: idx === 0 ? ("por_completar" as const) : ("pendiente" as const),
    }));

    await db.routines.put({ ...storedRoutine, dias });

    for (let i = 0; i < dias.length; i++) {
      const day = dias[i];
      const key: [string, number] = [routine.id, day.numero_dia];
      const existingProgress = await db.dayProgress.get(key);

      await db.dayProgress.put({
        routineId: routine.id,
        numero_dia: day.numero_dia,
        estado: day.estado,
        updatedAt: nowIso(),
        ...(existingProgress ?? {}),
        completedAt: undefined,
        durationMinutes: undefined,
        notes: undefined,
      });
    }
  });

  notifyRoutineUpdated();
}

/** Reemplaza el contenido de un día en la rutina activa (misma `numero_dia`, p. ej. tras ajuste con IA). */
export async function replaceTrainingDayContent(
  numero_dia: number,
  nextDay: TrainingDay,
): Promise<boolean> {
  const routine = await getActiveRoutine();
  if (!routine) return false;
  const dias = routine.dias.map((d) =>
    d.numero_dia === numero_dia ? nextDay : d,
  );
  await setActiveRoutine({ ...routine, dias });
  return true;
}

export async function getActiveRoutineDayBySlug(slug: string) {
  const routine = await getActiveRoutine();
  if (!routine) return null;

  const match = slug.match(/(\d+)/);
  const numero_dia = match ? Number(match[1]) : NaN;
  if (!Number.isFinite(numero_dia)) return null;

  const day = routine.dias.find((d) => d.numero_dia === numero_dia) ?? null;
  if (!day) return null;

  const progress = await db.dayProgress.get([routine.id, numero_dia]);
  return {
    routine,
    day,
    progress,
  };
}

export async function updateDayStatus(
  numero_dia: number,
  estado: Status,
  meta?: Omit<DayProgress, "routineId" | "numero_dia" | "estado" | "updatedAt">,
) {
  const routineId = await getActiveRoutineId();
  if (!routineId) return;

  await db.transaction("rw", db.routines, db.dayProgress, async () => {
    const existingProgress = await db.dayProgress.get([routineId, numero_dia]);
    const storedRoutine = await db.routines.get(routineId);

    const matchingDay =
      storedRoutine?.dias.find((d) => d.numero_dia === numero_dia) ?? null;
    const computedDuration =
      matchingDay && estado === "completado"
        ? totalDurationMinutes(matchingDay as TrainingDay)
        : undefined;

    const computedMeta: Partial<DayProgress> =
      estado === "completado"
        ? {
            completedAt:
              (meta as DayProgress | undefined)?.completedAt ??
              existingProgress?.completedAt ??
              nowIso(),
            durationMinutes:
              (meta as DayProgress | undefined)?.durationMinutes ??
              existingProgress?.durationMinutes ??
              computedDuration,
          }
        : {};

    await db.dayProgress.put({
      routineId,
      numero_dia,
      estado,
      updatedAt: nowIso(),
      ...(existingProgress ?? {}),
      ...(meta ?? {}),
      ...(computedMeta as Partial<DayProgress>),
    });
    if (!storedRoutine) return;

    const dias = storedRoutine.dias.map((d) =>
      d.numero_dia === numero_dia
        ? ({ ...d, estado } satisfies TrainingDay)
        : d,
    );

    const firstIncompleteIndex = dias.findIndex(
      (d) => d.estado !== "completado",
    );
    for (let i = 0; i < dias.length; i++) {
      if (dias[i].estado === "completado") continue;
      dias[i] = {
        ...dias[i],
        estado: i === firstIncompleteIndex ? "por_completar" : "pendiente",
      };
    }

    await db.routines.put({ ...storedRoutine, dias });
  });

  notifyRoutineUpdated();
}

export async function getProgressSummary(): Promise<Progress | null> {
  const routine = await getActiveRoutine();
  if (!routine) return null;

  const total = routine.dias.length;
  // Source of truth for completion state is the routine itself (UI reads `routine.dias[*].estado`).
  // `dayProgress` stores completion metadata like durationMinutes.
  const completedDays = routine.dias.filter((d) => d.estado === "completado");
  const completados = completedDays.length;

  // Tiempo total sumado de los días completados según la rutina actual.
  // Si en el futuro se quiere reflejar solo los minutos registrados manualmente,
  // se podría priorizar `dayProgress.durationMinutes` cuando exista.
  const tiempo_total = completedDays.reduce(
    (acc, d) => acc + totalDurationMinutes(d),
    0,
  );

  const now = Date.now();
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const thisStart = now - weekMs;
  const prevStart = now - 2 * weekMs;

  // For week-over-week comparisons, use history across routines.
  const allProgress = await db.dayProgress.toArray();
  const completedProgress = allProgress.filter(
    (p) => p.estado === "completado",
  );
  const minutesInRange = (startMs: number, endMs: number) =>
    completedProgress.reduce((acc, p) => {
      const ts =
        parseIsoToMs(p.completedAt) ?? parseIsoToMs(p.updatedAt) ?? null;
      if (ts === null) return acc;
      if (ts < startMs || ts >= endMs) return acc;
      return acc + (p.durationMinutes ?? 0);
    }, 0);

  const minutesThisWeek = minutesInRange(thisStart, now);
  const minutesPrevWeek = minutesInRange(prevStart, thisStart);
  const tiempo_delta_pct =
    minutesPrevWeek > 0
      ? Math.round(
          ((minutesThisWeek - minutesPrevWeek) / minutesPrevWeek) * 100 * 10,
        ) / 10
      : null;

  const routinesNewestFirst = await db.routines
    .orderBy("createdAt")
    .reverse()
    .toArray();
  const currentIdx = routinesNewestFirst.findIndex((s) => s.id === routine.id);
  const prevStored =
    currentIdx >= 0 && currentIdx + 1 < routinesNewestFirst.length
      ? routinesNewestFirst[currentIdx + 1]
      : null;
  const prevRoutine = prevStored ? storedToRoutine(prevStored) : null;
  const tiempo_routine_anterior_min = prevRoutine
    ? totalMinutesCompletedInRoutine(prevRoutine)
    : null;
  const tiempo_delta_vs_routine_anterior_pct =
    tiempo_routine_anterior_min != null &&
    tiempo_routine_anterior_min > 0 &&
    Number.isFinite(tiempo_total)
      ? Math.round(
          ((tiempo_total - tiempo_routine_anterior_min) /
            tiempo_routine_anterior_min) *
            100 *
            10,
        ) / 10
      : null;

  const intensitySourceDays =
    completedDays.length > 0 ? completedDays : routine.dias;
  const intensityCounts = intensitySourceDays.reduce(
    (acc, d) => {
      acc[d.intensidad] += 1;
      return acc;
    },
    { baja: 0, media: 0, alta: 0 } as Record<"baja" | "media" | "alta", number>,
  );
  const topIntensity =
    intensityCounts.alta >= intensityCounts.media &&
    intensityCounts.alta >= intensityCounts.baja
      ? "alta"
      : intensityCounts.media >= intensityCounts.baja
        ? "media"
        : "baja";

  const intensidad =
    INTENSITY_VALUES.find((i) => i.nivel === topIntensity) ??
    INTENSITY_VALUES[0];

  return {
    consistencia: { completados, total },
    tiempo_total,
    tiempo_delta_pct,
    tiempo_routine_anterior_min,
    tiempo_delta_vs_routine_anterior_pct,
    intensidad,
  };
}
