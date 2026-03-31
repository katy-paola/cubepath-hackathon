"use client";

import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SlidersHorizontal } from "@/components/icons";
import {
  Button,
  FormField,
  HealthLimitationsField,
  SelectBox,
} from "@/components/ui";
import {
  type RoutineFormValues,
  mapRoutineConfigToFormValues,
  mapRoutineFormToConfig,
} from "@/lib/routine-form-mapper";
import type { Routine, TrainingDay } from "@/lib/types";
import {
  getActiveRoutine,
  onRoutineUpdated,
  setActiveRoutine as persistActiveRoutine,
} from "@/lib/storage/routine-store";
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
import { cn } from "@/lib/utils";

import { generateSectionAssets } from "./generate-section-assets";
import { GenerateSectionInfo } from "./generate-section-info";

export type GenerateSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
>;

export function GenerateSection({ className, ...props }: GenerateSectionProps) {
  const [formValues, setFormValues] = useState<RoutineFormValues>({
    objective: routineFormDefaults.objective,
    level: routineFormDefaults.level,
    frequency: routineFormDefaults.frequency,
    sessionTime: routineFormDefaults.sessionTime,
    location: routineFormDefaults.location,
    commitment: routineFormDefaults.commitment,
    health: [...routineFormDefaults.health],
  });
  const [activeRoutine, setActiveRoutineState] = useState<Routine | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [streamStatus, setStreamStatus] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const refreshActiveRoutine = useCallback(async () => {
    const r = await getActiveRoutine();
    setActiveRoutineState(r);
    if (r) {
      setFormValues(mapRoutineConfigToFormValues(r.config));
    }
  }, []);

  useEffect(() => {
    void refreshActiveRoutine();
  }, [refreshActiveRoutine]);

  useEffect(() => {
    return onRoutineUpdated(() => {
      void refreshActiveRoutine();
    });
  }, [refreshActiveRoutine]);

  function updateField<Key extends keyof RoutineFormValues>(
    key: Key,
    value: RoutineFormValues[Key],
  ) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }

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

  // Avoid recreating strings when rendering many selects.
  const aria = useMemo(
    () => ({
      objective: `Seleccionar Objetivo (actual: ${formValues.objective})`,
      level: `Seleccionar Nivel (actual: ${formValues.level})`,
      frequency: `Seleccionar Frecuencia semanal (actual: ${formValues.frequency})`,
      sessionTime: `Seleccionar Tiempo por sesión (actual: ${formValues.sessionTime})`,
      location: `Seleccionar Lugar preferido (actual: ${formValues.location})`,
      commitment: `Seleccionar Compromiso (actual: ${formValues.commitment})`,
      health: `Seleccionar Salud y limitaciones (actual: ${
        formValues.health.length
          ? formValues.health
              .map((c) => routineHealthLimitationLabel(c))
              .join(", ")
          : "ninguna"
      })`,
    }),
    [
      formValues.commitment,
      formValues.frequency,
      formValues.health,
      formValues.level,
      formValues.location,
      formValues.objective,
      formValues.sessionTime,
    ],
  );

  async function handleGenerateRoutine(
    event?: React.FormEvent<HTMLFormElement>,
  ) {
    event?.preventDefault();
    setIsGenerating(true);
    setErrorMessage(null);
    setStreamStatus("Iniciando...");

    const payload = mapRoutineFormToConfig(formValues);
    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const existing = await getActiveRoutine();
      const routineBase: Routine = existing
        ? { ...existing, config: payload }
        : {
            id: crypto.randomUUID(),
            config: payload,
            dias: [],
            createdAt: new Date(),
          };

      const response = await fetch("/api/generate-routine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const json = await response.json().catch(() => null);
        setErrorMessage(json?.error ?? "No se pudo generar la rutina.");
        return;
      }

      const days: TrainingDay[] = [];
      let expectedDays: number = payload.frecuencia_semanal;
      let streamErrored = false;

      await consumeRoutineStream(response, async (evt, data) => {
        const row = data as Record<string, unknown>;
        if (evt === "start") {
          expectedDays =
            typeof row.totalDays === "number"
              ? row.totalDays
              : payload.frecuencia_semanal;
          setStreamStatus(`Generando rutina (${expectedDays} días)...`);
          return;
        }

        if (evt === "progress") {
          setStreamStatus(
            `Generando día ${String(row.generatedDays)}/${String(row.totalDays)}...`,
          );
          return;
        }

        if (evt === "day") {
          days.push(data as TrainingDay);
          // No persistimos rutinas parciales: evitamos rutina vacía / 1 día y inconsistencias.
          // Persistiremos una sola vez cuando se valide la rutina completa.

          if (days.length === 1) {
            requestAnimationFrame(() => {
              document.getElementById("rutina-generada")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            });
          }
          return;
        }

        if (evt === "error") {
          setErrorMessage(
            typeof row.message === "string"
              ? row.message
              : "No se pudo generar la rutina.",
          );
          setStreamStatus(null);
          streamErrored = true;
          return;
        }

        if (evt === "done") {
          setStreamStatus("Rutina lista.");
        }
      });

      if (streamErrored) return;

      if (days.length < 2) {
        setErrorMessage(
          "La rutina generada está vacía o incompleta (mínimo 2 días).",
        );
        setStreamStatus(null);
        return;
      }

      if (
        days.length !== expectedDays ||
        days.length !== payload.frecuencia_semanal
      ) {
        setErrorMessage(
          `La rutina generada no coincide con la frecuencia seleccionada (${payload.frecuencia_semanal} días). Se generaron ${days.length} días.`,
        );
        setStreamStatus(null);
        return;
      }

      // Normaliza numeración por si el backend/cached stream se desordenó.
      const normalizedDays = days.map((d, idx) => ({
        ...d,
        numero_dia: idx + 1,
        estado: idx === 0 ? ("por_completar" as const) : ("pendiente" as const),
      }));

      await persistActiveRoutine({ ...routineBase, dias: normalizedDays });
    } catch (error) {
      if (abortController.signal.aborted) {
        setStreamStatus("Generación cancelada.");
        return;
      }
      setErrorMessage(
        error instanceof Error ? error.message : "Error inesperado",
      );
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  }

  function handleCancel() {
    abortRef.current?.abort("User cancelled");
  }

  return (
    <section
      {...props}
      aria-labelledby="configura-rutina-heading"
      className={cn(
        "relative grid w-full max-w-page grid-cols-1 items-stretch gap-6 lg:grid-cols-3",
        className,
      )}
    >
      <article
        className={cn(
          "relative flex w-full shrink-0 flex-col items-start justify-self-stretch rounded-3xl border border-border-subtle bg-card p-4 md:gap-5 md:p-5 lg:col-span-2 lg:gap-6 lg:p-6",
          "gap-4",
        )}
        aria-labelledby="configura-rutina-heading"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-6 shrink-0 text-heading" />
          <h2
            id="configura-rutina-heading"
            className="whitespace-nowrap text-xl font-bold leading-8 text-heading md:text-2xl md:leading-9 lg:text-2xl lg:leading-10"
          >
            Configura tu rutina
          </h2>
        </div>

        <form
          className="w-full"
          onSubmit={handleGenerateRoutine}
          aria-label="Formulario para generar rutina"
        >
          <div className="relative grid w-full shrink-0 grid-cols-1 gap-4 border-b border-border pb-4 md:grid-cols-2 md:gap-5 md:pb-5 lg:gap-6 lg:pb-6">
            <FormField className="w-full" label="Objetivo">
              <SelectBox
                value={formValues.objective}
                options={routineObjectiveOptions}
                onValueChange={(value) => updateField("objective", value)}
                className="w-full"
                triggerAriaLabel={aria.objective}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>

            <FormField className="w-full" label="Nivel">
              <SelectBox
                value={formValues.level}
                options={routineLevelOptions}
                onValueChange={(value) => updateField("level", value)}
                className="w-full"
                triggerAriaLabel={aria.level}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>

            <FormField className="w-full" label="Frecuencia semanal">
              <SelectBox
                value={formValues.frequency}
                options={routineFrequencyOptions}
                onValueChange={(value) => updateField("frequency", value)}
                className="w-full"
                triggerAriaLabel={aria.frequency}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>

            <FormField className="w-full" label="Tiempo por sesión">
              <SelectBox
                value={formValues.sessionTime}
                options={routineSessionTimeOptions}
                onValueChange={(value) => updateField("sessionTime", value)}
                className="w-full"
                triggerAriaLabel={aria.sessionTime}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>

            <FormField className="w-full" label="Lugar preferido">
              <SelectBox
                value={formValues.location}
                options={routineLocationOptions}
                onValueChange={(value) => updateField("location", value)}
                className="w-full"
                triggerAriaLabel={aria.location}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>

            <FormField className="w-full" label="Compromiso">
              <SelectBox
                value={formValues.commitment}
                options={routineCommitmentOptions}
                onValueChange={(value) => updateField("commitment", value)}
                className="w-full"
                triggerAriaLabel={aria.commitment}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>

            <FormField
              className="w-full md:col-span-2"
              label="Salud y limitaciones"
            >
              <HealthLimitationsField
                value={formValues.health}
                onChange={(next) => updateField("health", next)}
                className="w-full"
                triggerAriaLabel={aria.health}
              />
            </FormField>
          </div>

          <div className="mt-4 flex w-full flex-col gap-3">
            <Button
              variant="primary"
              className="w-full"
              type="submit"
              disabled={isGenerating}
              icon={
                <Image
                  src={generateSectionAssets.sparkles}
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden
                  className="size-4"
                />
              }
            >
              {isGenerating
                ? "Generando rutina..."
                : activeRoutine
                  ? "Regenerar rutina"
                  : "Generar rutina"}
            </Button>

            {isGenerating ? (
              <Button
                variant="secondary"
                className="w-full"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            ) : null}

            {errorMessage ? (
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            ) : null}
            {streamStatus ? (
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {streamStatus}
              </p>
            ) : null}
          </div>
        </form>
      </article>

      <GenerateSectionInfo />
    </section>
  );
}
