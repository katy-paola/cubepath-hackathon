"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Routine } from "@/lib/types";
import { clearActiveRoutine, getActiveRoutine, onRoutineUpdated } from "@/lib/storage/routine-store";

import { WorkoutSection, type WorkoutSectionDay } from "./workout-section";

function mapRoutineToDays(routine: Routine): WorkoutSectionDay[] {
  return routine.dias.map((d) => {
    const slug = `dia-${d.numero_dia}`;
    const day = `Día ${d.numero_dia}`;

    const isCompleted = d.estado === "completado";
    const isActive = d.estado === "por_completar";

    return {
      slug,
      day,
      name: d.tipo.charAt(0).toUpperCase() + d.tipo.slice(1),
      borderClass: isCompleted
        ? "border-success-border"
        : isActive
          ? "border-[#63789c]"
          : "border-border",
      statusLabel: isCompleted ? "Completado" : isActive ? "Completar día" : undefined,
    };
  });
}

export function WorkoutSectionLive() {
  const router = useRouter();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const r = await getActiveRoutine();
      if (cancelled) return;
      setRoutine(r);
      setLoading(false);
    }
    load();
    const unsubscribe = onRoutineUpdated(() => {
      load();
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const days = useMemo(() => (routine ? mapRoutineToDays(routine) : []), [routine]);

  if (loading || !routine) return null;

  return (
    <WorkoutSection
      id="rutina-generada"
      days={days}
      onReset={async () => {
        await clearActiveRoutine();
        setRoutine(null);
        router.push("/");
      }}
      onRefresh={() => {
        // Placeholder for future "Actualizar" behavior (AI adjust routine).
      }}
    />
  );
}

