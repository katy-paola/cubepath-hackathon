"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Routine } from "@/lib/types";
import {
  getActiveRoutine,
  onRoutineUpdated,
  resetActiveRoutineProgress,
  setActiveRoutine,
  updateDayStatus,
} from "@/lib/storage/routine-store";
import { Button } from "@/components/ui/button";
import type { TrainingDay } from "@/lib/types";

import { WorkoutSection, type WorkoutSectionDay } from "./workout-section";

function mapRoutineToDays(routine: Routine): WorkoutSectionDay[] {
  return routine.dias.map((d) => {
    const slug = `dia-${d.numero_dia}`;
    const day = `Día ${d.numero_dia}`;

    const isCompleted = d.estado === "completado";
    const isActive = d.estado === "por_completar";
    const isLocked = d.estado === "pendiente";

    return {
      slug,
      day,
      name: d.tipo.charAt(0).toUpperCase() + d.tipo.slice(1),
      numeroDia: d.numero_dia,
      borderClass: isCompleted
        ? "border-success-border"
        : isActive
          ? "border-border-active"
          : "border-border",
      statusLabel: isCompleted
        ? "Completado"
        : isActive
          ? "Completar día"
          : undefined,
      locked: isLocked,
    };
  });
}

export function WorkoutSectionLive() {
  const router = useRouter();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [refreshDialogOpen, setRefreshDialogOpen] = useState(false);
  const [refreshFeedback, setRefreshFeedback] = useState<string | null>(null);
  const [refreshConfirmed, setRefreshConfirmed] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState<{
    generatedDays: number;
    totalDays: number;
  } | null>(null);

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

  const days = useMemo(
    () => (routine ? mapRoutineToDays(routine) : []),
    [routine],
  );
  const canUpdate = useMemo(
    () =>
      routine ? routine.dias.every((d) => d.estado === "completado") : false,
    [routine],
  );
  const canReset = useMemo(
    () =>
      routine ? routine.dias.some((d) => d.estado === "completado") : false,
    [routine],
  );

  async function consumeRoutineStream(
    response: Response,
    onEvent: (event: string, data: unknown) => Promise<void> | void,
  ) {
    if (!response.body) {
      throw new Error("Streaming no soportado en esta respuesta.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";

      for (const part of parts) {
        const lines = part.split("\n");
        let event = "message";
        let dataStr = "";
        for (const line of lines) {
          if (line.startsWith("event:")) event = line.slice(6).trim();
          if (line.startsWith("data:")) dataStr += line.slice(5).trim();
        }
        if (!dataStr) continue;
        const data: unknown = JSON.parse(dataStr);
        await onEvent(event, data);
      }
    }
  }

  async function handleRefreshConfirmed() {
    setRefreshConfirmed(true);
    setUpdateError(null);
    setRefreshFeedback("Generando nueva rutina…");
    setRefreshDialogOpen(false);
    setIsUpdating(true);
    setRefreshProgress({
      generatedDays: 0,
      totalDays: routine?.dias.length ?? 0,
    });

    try {
      const current = await getActiveRoutine();
      if (!current) return;

      const res = await fetch("/api/upgrade-routine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routine: current.dias }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? "No se pudo actualizar la rutina.");
      }

      const nextDays: TrainingDay[] = [];
      let expectedDays = current.dias.length;
      let streamErrored = false;

      await consumeRoutineStream(res, async (evt, data) => {
        const row = data as Record<string, unknown>;
        if (evt === "start") {
          expectedDays =
            typeof row.totalDays === "number" ? row.totalDays : expectedDays;
          setRefreshProgress({ generatedDays: 0, totalDays: expectedDays });
          return;
        }
        if (evt === "progress") {
          setRefreshProgress({
            generatedDays:
              typeof row.generatedDays === "number"
                ? row.generatedDays
                : nextDays.length,
            totalDays:
              typeof row.totalDays === "number" ? row.totalDays : expectedDays,
          });
          return;
        }
        if (evt === "day") {
          nextDays.push(data as TrainingDay);
          setRefreshProgress({
            generatedDays: nextDays.length,
            totalDays: expectedDays,
          });
          return;
        }
        if (evt === "error") {
          setUpdateError(
            typeof row.message === "string"
              ? row.message
              : "Error actualizando la rutina.",
          );
          setRefreshFeedback(null);
          streamErrored = true;
          return;
        }
      });

      if (streamErrored) return;
      if (
        nextDays.length !== expectedDays ||
        nextDays.length !== current.dias.length
      ) {
        throw new Error(
          "La rutina actualizada no coincide en cantidad de días.",
        );
      }

      const mergedDays = nextDays.map((day, idx) => ({
        ...day,
        numero_dia: idx + 1,
        // Nueva rutina: reinicia el progreso.
        estado: idx === 0 ? "por_completar" : "pendiente",
      })) as TrainingDay[];

      const nextRoutine: Routine = {
        id: crypto.randomUUID(),
        config: current.config,
        dias: mergedDays,
        createdAt: new Date(),
      };

      await setActiveRoutine(nextRoutine);
      setRoutine(nextRoutine);
      setRefreshFeedback("Rutina actualizada correctamente.");
    } catch (e) {
      setUpdateError(
        e instanceof Error ? e.message : "Error actualizando la rutina.",
      );
      setRefreshFeedback(null);
    } finally {
      setIsUpdating(false);
      setRefreshProgress(null);
    }
  }

  if (loading || !routine) return null;

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {isUpdating ? (
          <section className="w-full rounded-3xl border border-border-subtle bg-card p-6">
            <h3 className="text-xl font-bold leading-8 text-heading">
              Actualizando rutina…
            </h3>
            <p
              className="mt-2 text-sm leading-6 text-muted-foreground"
              aria-live="polite"
            >
              {refreshProgress
                ? `Generando día ${refreshProgress.generatedDays}/${refreshProgress.totalDays}…`
                : "Generando nueva rutina…"}
            </p>
            {updateError ? (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {updateError}
              </p>
            ) : null}
          </section>
        ) : null}

        {isUpdating ? null : (
          <WorkoutSection
            id="rutina-generada"
            days={days}
            onCompleteDay={async (numeroDia) => {
              await updateDayStatus(numeroDia, "completado", {
                completedAt: new Date().toISOString(),
              });
              const r = await getActiveRoutine();
              setRoutine(r);
            }}
            onReset={
              canReset
                ? async () => {
                    await resetActiveRoutineProgress();
                    const r = await getActiveRoutine();
                    setRoutine(r);
                    router.push("/");
                  }
                : undefined
            }
            onRefresh={
              canUpdate
                ? () => {
                    setRefreshDialogOpen(true);
                    setRefreshConfirmed(false);
                    setRefreshFeedback(null);
                    setUpdateError(null);
                  }
                : undefined
            }
            refreshLoading={isUpdating}
          />
        )}

        {updateError ? (
          <p className="text-sm text-red-600" role="alert">
            {updateError}
          </p>
        ) : null}
      </div>

      {refreshDialogOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Confirmación de actualización"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isUpdating) {
              setRefreshDialogOpen(false);
            }
          }}
        >
          <div className="w-full max-w-lg rounded-3xl border border-border-subtle bg-card p-6 shadow-lg">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold leading-8 text-heading">
                Confirmar actualización
              </h3>
              <p className="text-base leading-6 text-muted-foreground">
                ¿Estás seguro? Se generará una{" "}
                <span className="font-semibold">nueva rutina</span> mejorada
                basada en la rutina actual.
              </p>

              {refreshConfirmed ? (
                <p
                  className="text-sm leading-6 text-muted-foreground"
                  aria-live="polite"
                >
                  {refreshFeedback ?? "Generando…"}
                </p>
              ) : null}

              {updateError ? (
                <p className="text-sm leading-6 text-red-600" role="alert">
                  {updateError}
                </p>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (isUpdating) return;
                    setRefreshDialogOpen(false);
                  }}
                  disabled={isUpdating}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (isUpdating) return;
                    handleRefreshConfirmed();
                  }}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Generando..." : "Sí, continuar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
