"use client";

import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Button,
  FormField,
  HealthLimitationsField,
  SelectBox,
} from "@/components/ui";
import {
  mapRoutineConfigToFormValues,
  mapRoutineFormToConfig,
  routineFrequencyOptionsForMinDays,
} from "@/lib/routine-form-mapper";
import {
  routineCommitmentOptions,
  routineFormDefaults,
  routineFrequencyOptions,
  routineHealthLimitationLabel,
  routineLevelOptions,
  routineLocationOptions,
  routineObjectiveOptions,
  routineSessionTimeOptions,
} from "@/lib/routine-form-options";
import type { Routine } from "@/lib/types";
import type { HealthLimitation } from "@/lib/types/config";
import {
  getActiveRoutine,
  onRoutineUpdated,
  setActiveRoutine,
} from "@/lib/storage/routine-store";
import { cn } from "@/lib/utils";

import { adjustRoutineAssets } from "./adjust-routine-assets";

export type AdjustRoutineCardProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  device?: "desktop" | "tablet" | "mobile";
  /** Galería: muestra el layout sin IndexedDB ni envío. */
  demoMode?: boolean;
};

export function AdjustRoutineCard({
  className,
  device = "desktop",
  demoMode = false,
  ...props
}: AdjustRoutineCardProps) {
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const [loaded, setLoaded] = useState(demoMode);
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [objective, setObjective] = useState<string>(
    routineFormDefaults.objective,
  );
  const [level, setLevel] = useState<string>(routineFormDefaults.level);
  const [frequency, setFrequency] = useState<string>(
    routineFormDefaults.frequency,
  );
  const [sessionTime, setSessionTime] = useState<string>(
    routineFormDefaults.sessionTime,
  );
  const [location, setLocation] = useState<string>(
    routineFormDefaults.location,
  );
  const [commitment, setCommitment] = useState<string>(
    routineFormDefaults.commitment,
  );
  const [health, setHealth] = useState<HealthLimitation[]>([
    ...routineFormDefaults.health,
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRoutine = useCallback(async () => {
    if (demoMode) return;
    const r = await getActiveRoutine();
    setRoutine(r);
    if (r) {
      const v = mapRoutineConfigToFormValues(r.config);
      setObjective(v.objective);
      setLevel(v.level);
      setFrequency(v.frequency);
      setSessionTime(v.sessionTime);
      setLocation(v.location);
      setCommitment(v.commitment);
      setHealth(v.health);
    }
    setLoaded(true);
  }, [demoMode]);

  useEffect(() => {
    void loadRoutine();
  }, [loadRoutine]);

  useEffect(() => {
    if (demoMode) return () => {};
    return onRoutineUpdated(() => {
      void loadRoutine();
    });
  }, [demoMode, loadRoutine]);

  const frequencyOptions = useMemo(() => {
    if (demoMode) return routineFrequencyOptions;
    if (!routine) return routineFrequencyOptions;
    return routineFrequencyOptionsForMinDays(routine.dias.length);
  }, [demoMode, routine]);

  useEffect(() => {
    if (demoMode || !routine) return;
    const opts = routineFrequencyOptionsForMinDays(routine.dias.length);
    setFrequency((f) => (opts.includes(f) ? f : (opts[0] ?? f)));
  }, [demoMode, routine]);

  const allDaysComplete =
    routine !== null &&
    routine.dias.length > 0 &&
    routine.dias.every((d) => d.estado === "completado");

  const aria = useMemo(
    () => ({
      objective: `Seleccionar Objetivo (actual: ${objective})`,
      level: `Seleccionar Nivel (actual: ${level})`,
      frequency: `Seleccionar Frecuencia semanal (actual: ${frequency})`,
      sessionTime: `Seleccionar Tiempo por sesión (actual: ${sessionTime})`,
      location: `Seleccionar Lugar preferido (actual: ${location})`,
      commitment: `Seleccionar Compromiso (actual: ${commitment})`,
      health: `Seleccionar Salud y limitaciones (actual: ${
        health.length
          ? health.map((c) => routineHealthLimitationLabel(c)).join(", ")
          : "ninguna"
      })`,
    }),
    [commitment, frequency, health, level, location, objective, sessionTime],
  );

  async function handleApply() {
    if (demoMode || !routine) return;
    setError(null);
    const update = mapRoutineFormToConfig({
      objective,
      level,
      frequency,
      sessionTime,
      location,
      commitment,
      health,
    });
    if (update.frecuencia_semanal < routine.dias.length) {
      setError(
        "La frecuencia no puede ser menor al número de días de tu rutina.",
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/adjust-routine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routine: routine.dias, update }),
      });
      const json = (await res.json()) as { data?: unknown; error?: string };
      if (!res.ok) {
        throw new Error(json.error ?? "No se pudo reajustar la rutina.");
      }
      if (!Array.isArray(json.data)) {
        throw new Error("Respuesta inválida del servidor.");
      }
      await setActiveRoutine({
        ...routine,
        config: update,
        dias: json.data as Routine["dias"],
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al reajustar.");
    } finally {
      setLoading(false);
    }
  }

  if (!demoMode && !loaded) return null;
  if (!demoMode && !routine) return null;
  if (!demoMode && allDaysComplete) return null;

  return (
    <section
      {...props}
      className={cn(
        "relative flex w-full max-w-page flex-col items-start gap-8 overflow-clip rounded-3xl bg-hero-surface",
        isMobile ? "p-4" : "p-6",
        className,
      )}
      aria-labelledby="ajustar-rutina-heading"
    >
      <h2
        id="ajustar-rutina-heading"
        className={cn(
          "w-full font-bold leading-8 text-heading",
          isMobile ? "text-xl" : "text-2xl",
        )}
      >
        ¿Cambio de planes? Reajusta rápido.
      </h2>

      {error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex w-full flex-col gap-6">
        <div
          className={cn(
            "w-full",
            isMobile
              ? "flex flex-col gap-2.5"
              : isTablet
                ? "grid grid-cols-2 items-stretch gap-5 lg:gap-x-6 lg:gap-y-6"
                : "grid grid-cols-4 items-stretch gap-x-6 gap-y-6",
          )}
        >
          <FormField className="w-full" label="Objetivo">
            <SelectBox
              value={objective}
              options={routineObjectiveOptions}
              onValueChange={setObjective}
              className="w-full"
              triggerAriaLabel={aria.objective}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Nivel">
            <SelectBox
              value={level}
              options={routineLevelOptions}
              onValueChange={setLevel}
              className="w-full"
              triggerAriaLabel={aria.level}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Frecuencia semanal">
            <SelectBox
              value={frequency}
              options={frequencyOptions}
              onValueChange={setFrequency}
              className="w-full"
              triggerAriaLabel={aria.frequency}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Tiempo por sesión">
            <SelectBox
              value={sessionTime}
              options={routineSessionTimeOptions}
              onValueChange={setSessionTime}
              className="w-full"
              triggerAriaLabel={aria.sessionTime}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Lugar preferido">
            <SelectBox
              value={location}
              options={routineLocationOptions}
              onValueChange={setLocation}
              className="w-full"
              triggerAriaLabel={aria.location}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Compromiso">
            <SelectBox
              value={commitment}
              options={routineCommitmentOptions}
              onValueChange={setCommitment}
              className="w-full"
              triggerAriaLabel={aria.commitment}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField
            className={cn("w-full", !isMobile && "col-span-2")}
            label="Salud y limitaciones"
          >
            <HealthLimitationsField
              value={health}
              onChange={setHealth}
              className="w-full"
              triggerAriaLabel={aria.health}
            />
          </FormField>
        </div>

        <div className="flex w-full justify-center">
          <Button
            type="button"
            className={cn(isMobile ? "w-full" : "shrink-0")}
            size="sm"
            disabled={loading || demoMode}
            onClick={() => void handleApply()}
            icon={
              <Image
                src={adjustRoutineAssets.sparkles}
                alt=""
                width={16}
                height={16}
                aria-hidden
                className="size-4"
              />
            }
          >
            {loading ? "Aplicando…" : "Aplicar cambios"}
          </Button>
        </div>
      </div>
    </section>
  );
}
