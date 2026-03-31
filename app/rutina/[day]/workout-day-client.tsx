"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { HomeHeader } from "@/components/home/home-header";
import { IntensityMeter } from "@/components/progress";
import { AdjustDayCard } from "@/components/routine/adjust-day-card";
import { Button } from "@/components/ui";
import { buttonVariants } from "@/components/ui/button";
import {
  getActiveRoutineDayBySlug,
  updateDayStatus,
} from "@/lib/storage/routine-store";
import type { Status, TrainingDay } from "@/lib/types";
import { cn } from "@/lib/utils";

type WorkoutDayClientProps = {
  daySlug: string;
};

function ClockIcon() {
  return (
    <span
      aria-hidden
      className="relative inline-block size-4 rounded-full border-2 border-muted-foreground"
    >
      <span className="absolute left-1/2 top-0.75 h-1 w-[1.5px] -translate-x-1/2 rounded-full bg-muted-foreground" />
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-1 rounded-full bg-muted-foreground" />
    </span>
  );
}

function intensityToMeter(level: TrainingDay["intensidad"]) {
  if (level === "alta") return "high" as const;
  if (level === "media") return "medium" as const;
  return "low" as const;
}

function intensityLabel(level: TrainingDay["intensidad"]) {
  if (level === "alta") return "ALTA";
  if (level === "media") return "MODERADA";
  return "BAJA";
}

function totalDurationMinutes(day: TrainingDay) {
  return day.ejercicios.reduce((acc, ex) => acc + (ex.duracion ?? 0), 0);
}

export function WorkoutDayClient({ daySlug }: WorkoutDayClientProps) {
  const [state, setState] = useState<{
    loading: boolean;
    day: TrainingDay | null;
  }>({ loading: true, day: null });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await getActiveRoutineDayBySlug(daySlug);
      if (cancelled) return;
      setState({ loading: false, day: res?.day ?? null });
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [daySlug]);

  const view = useMemo(() => {
    const day = state.day;
    if (!day) return null;

    const duration = totalDurationMinutes(day);
    return {
      day,
      headerTitle: `Día ${day.numero_dia} - ${day.tipo}`,
      intensityMeter: intensityToMeter(day.intensidad),
      intensityText: intensityLabel(day.intensidad),
      durationText: `${duration}min`,
      showAdjustDay: day.estado === "por_completar",
      borderClass:
        day.estado === "completado"
          ? "border-success-border"
          : "border-[#63789c]",
    };
  }, [state.day]);

  async function handleComplete() {
    if (!view?.day) return;
    await updateDayStatus(view.day.numero_dia, "completado", {
      completedAt: new Date().toISOString(),
      durationMinutes: totalDurationMinutes(view.day),
    });
    const res = await getActiveRoutineDayBySlug(daySlug);
    setState({ loading: false, day: res?.day ?? null });
  }

  if (state.loading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-page-shell">
        <HomeHeader />
        <div className="mx-auto w-full max-w-page px-4 py-6 md:px-6">
          <p className="text-sm text-muted-foreground">Cargando tu rutina...</p>
        </div>
      </main>
    );
  }

  if (!view) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-page-shell">
        <HomeHeader />
        <div className="mx-auto w-full max-w-page px-4 py-10 md:px-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
            <h1 className="text-2xl font-bold text-heading">
              Aún no tienes una rutina guardada
            </h1>
            <p className="text-muted-foreground">
              Genera tu rutina desde el inicio para ver tu plan día a día.
            </p>
            <div className="flex gap-3">
              <Link href="/" className={buttonVariants({ variant: "primary" })}>
                Generar rutina
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-page-shell">
      <HomeHeader />

      <div className="mx-auto w-full max-w-page px-4 py-6 md:px-6">
        <section className="flex w-full flex-col gap-12">
          <header
            className={cn(
              "flex w-full flex-col gap-6 border-l-[3px] pl-4 lg:flex-row lg:items-start lg:justify-between",
              view.borderClass,
            )}
          >
            <h1 className="flex flex-col whitespace-nowrap leading-none">
              <span className="text-xs font-medium leading-6 text-primary-hover lg:text-sm">
                TU PLAN DE ACCIÓN
              </span>
              <span className="text-2xl font-bold leading-7.5 text-heading lg:text-[30px]">
                {view.headerTitle}
              </span>
            </h1>

            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:flex-nowrap">
              <div className="flex items-center gap-2">
                <IntensityMeter level={view.intensityMeter} />
                <span className="text-base font-medium uppercase leading-6 text-primary-hover">
                  {view.intensityText}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ClockIcon />
                <span className="text-base font-bold leading-normal text-subdued">
                  {view.durationText}
                </span>
              </div>

              {state.day?.estado === "completado" ? (
                <span className="whitespace-nowrap text-base font-bold leading-6 text-success-ink">
                  Completado
                </span>
              ) : (
                state.day?.estado === "por_completar" && (
                  <button
                    onClick={handleComplete}
                    className="whitespace-nowrap text-base font-bold leading-6 text-success-ink underline hover:no-underline"
                  >
                    Completar día
                  </button>
                )
              )}
            </div>
          </header>

          <div className="flex w-full flex-col gap-6">
            {view.day.ejercicios.map((exercise) => (
              <article key={exercise.nombre} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-primary"
                  />
                  <h2 className="text-[18px] font-bold leading-normal text-subdued">
                    {exercise.nombre}
                  </h2>
                </div>

                <div className="flex flex-col gap-3 pl-3.5">
                  <p className="text-base font-normal leading-normal text-subdued">
                    {exercise.descripcion}
                  </p>
                  <div className="flex items-center gap-2">
                    <ClockIcon />
                    <span className="text-base font-bold leading-normal text-subdued">
                      {exercise.duracion}min
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="w-full rounded-2xl bg-secondary p-4">
            <h3 className="text-base font-bold uppercase leading-3.75 tracking-[1px] text-primary-hover">
              Razón:
            </h3>
            <p className="mt-2 text-base font-medium leading-6 text-muted-foreground">
              {view.day.razon}
            </p>
          </aside>

          {view.showAdjustDay ? <AdjustDayCard /> : null}
        </section>
      </div>
    </main>
  );
}
