"use client";

import { useMemo, useState } from "react";

import { Sparkles } from "@/components/icons";
import { Button, FormField, SelectBox } from "@/components/ui";
import { mapAdjustDayFormToAdjustment } from "@/lib/map-adjust-day-form";
import {
  adjustDayDiscomfortOptions,
  adjustDayEnergyOptions,
  adjustDayLocationOptions,
  adjustDayTimeOptions,
} from "@/lib/routine-form-options";
import { replaceTrainingDayContent } from "@/lib/storage/routine-store";
import type { TrainingDay } from "@/lib/types";
import { cn } from "@/lib/utils";

const energyOptions = adjustDayEnergyOptions;
const timeOptions = adjustDayTimeOptions;
const locationOptions = adjustDayLocationOptions;
const discomfortOptions = adjustDayDiscomfortOptions;

export type AdjustDayCardProps = {
  day: TrainingDay;
  onDayUpdated?: () => void | Promise<void>;
  className?: string;
};

export function AdjustDayCard({
  day,
  onDayUpdated,
  className,
}: AdjustDayCardProps) {
  const [energy, setEnergy] = useState<string>("media");
  const [time, setTime] = useState<string>("45min");
  const [location, setLocation] = useState<string>("Exterior");
  const [discomfort, setDiscomfort] = useState<string>("Ninguna");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleApply() {
    setError(null);
    setLoading(true);
    try {
      const adjustment = mapAdjustDayFormToAdjustment({
        energy,
        time,
        location,
        discomfort,
      });
      const res = await fetch("/api/adjust-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, adjustment }),
      });
      const json = (await res.json()) as {
        data?: TrainingDay;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(json.error ?? "No se pudo adaptar el día.");
      }
      if (!json.data) {
        throw new Error("Respuesta inválida del servidor.");
      }
      const saved = await replaceTrainingDayContent(day.numero_dia, json.data);
      if (!saved) {
        throw new Error("No hay rutina activa para guardar el cambio.");
      }
      await onDayUpdated?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al adaptar el día.");
    } finally {
      setLoading(false);
    }
  }

  const aria = useMemo(
    () => ({
      energy: `Seleccionar Energía (actual: ${energy})`,
      time: `Seleccionar Tiempo (actual: ${time})`,
      location: `Seleccionar Lugar (actual: ${location})`,
      discomfort: `Seleccionar Molestias (actual: ${discomfort})`,
    }),
    [discomfort, energy, location, time],
  );

  return (
    <aside
      className={cn("w-full rounded-2xl bg-secondary p-6", className)}
      aria-label="Adaptar hoy"
    >
      <div className="flex w-full flex-col gap-8">
        <h3 className="text-[18px] font-bold leading-4 tracking-[1px] text-subdued">
          Adaptar hoy
        </h3>

        <div className="flex w-full flex-col items-center gap-8">
          {error ? (
            <p className="w-full text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FormField className="w-full" label="Energía">
              <SelectBox
                value={energy}
                options={energyOptions}
                onValueChange={setEnergy}
                className="w-full"
                triggerAriaLabel={aria.energy}
              />
            </FormField>

            <FormField className="w-full" label="Tiempo">
              <SelectBox
                value={time}
                options={timeOptions}
                onValueChange={setTime}
                className="w-full"
                triggerAriaLabel={aria.time}
              />
            </FormField>

            <FormField className="w-full" label="Lugar">
              <SelectBox
                value={location}
                options={locationOptions}
                onValueChange={setLocation}
                className="w-full"
                triggerAriaLabel={aria.location}
              />
            </FormField>

            <FormField className="w-full" label="Molestias">
              <SelectBox
                value={discomfort}
                options={discomfortOptions}
                onValueChange={setDiscomfort}
                className="w-full"
                triggerAriaLabel={aria.discomfort}
              />
            </FormField>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full opacity-80 md:w-auto"
            icon={<Sparkles className="size-4 text-primary-hover" />}
            disabled={loading}
            onClick={() => void handleApply()}
          >
            {loading ? "Aplicando…" : "Aplicar cambios"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
