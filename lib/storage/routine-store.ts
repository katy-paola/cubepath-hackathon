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
    await db.dayProgress.put({
      routineId,
      numero_dia,
      estado,
      updatedAt: nowIso(),
      ...(existingProgress ?? {}),
      ...(meta ?? {}),
    });

    const storedRoutine = await db.routines.get(routineId);
    if (!storedRoutine) return;

    const dias = storedRoutine.dias.map((d) =>
      d.numero_dia === numero_dia ? ({ ...d, estado } satisfies TrainingDay) : d,
    );

    const firstIncompleteIndex = dias.findIndex((d) => d.estado !== "completado");
    for (let i = 0; i < dias.length; i++) {
      if (dias[i].estado === "completado") continue;
      dias[i] = {
        ...dias[i],
        estado: i === firstIncompleteIndex ? "por_completar" : "pendiente",
      };
    }

    await db.routines.put({ ...storedRoutine, dias });
  });
}

export async function getProgressSummary(): Promise<Progress | null> {
  const routine = await getActiveRoutine();
  if (!routine) return null;

  const all = await db.dayProgress.where("routineId").equals(routine.id).toArray();
  const total = routine.dias.length;
  const completados = all.filter((p) => p.estado === "completado").length;

  const tiempo_total = all.reduce((acc, p) => acc + (p.durationMinutes ?? 0), 0);

  const intensityCounts = routine.dias.reduce(
    (acc, d) => {
      acc[d.intensidad] += 1;
      return acc;
    },
    { baja: 0, media: 0, alta: 0 } as Record<"baja" | "media" | "alta", number>,
  );
  const topIntensity =
    intensityCounts.alta >= intensityCounts.media && intensityCounts.alta >= intensityCounts.baja
      ? "alta"
      : intensityCounts.media >= intensityCounts.baja
        ? "media"
        : "baja";

  const intensidad = INTENSITY_VALUES.find((i) => i.nivel === topIntensity) ?? INTENSITY_VALUES[0];

  return {
    consistencia: { completados, total },
    tiempo_total,
    intensidad,
  };
}

