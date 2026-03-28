"use client";

import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Button, FormField, SelectBox } from "@/components/ui";
import {
  routineCommitmentOptions,
  routineFormDefaults,
  routineFrequencyOptions,
  routineHealthOptions,
  routineLevelOptions,
  routineLocationOptions,
  routineObjectiveOptions,
  routineSessionTimeOptions,
} from "@/lib/routine-form-options";
import { cn } from "@/lib/utils";

import { adjustRoutineAssets } from "./adjust-routine-assets";

export type AdjustRoutineCardProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  device?: "desktop" | "tablet" | "mobile";
};

export function AdjustRoutineCard({
  className,
  device = "desktop",
  ...props
}: AdjustRoutineCardProps) {
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const [objective, setObjective] = useState<string>(routineFormDefaults.objective);
  const [level, setLevel] = useState<string>(routineFormDefaults.level);
  const [frequency, setFrequency] = useState<string>(routineFormDefaults.frequency);
  const [sessionTime, setSessionTime] = useState<string>(routineFormDefaults.sessionTime);
  const [location, setLocation] = useState<string>(routineFormDefaults.location);
  const [commitment, setCommitment] = useState<string>(routineFormDefaults.commitment);
  const [health, setHealth] = useState<string>(routineFormDefaults.health);

  const aria = useMemo(
    () => ({
      objective: `Seleccionar Objetivo (actual: ${objective})`,
      level: `Seleccionar Nivel (actual: ${level})`,
      frequency: `Seleccionar Frecuencia semanal (actual: ${frequency})`,
      sessionTime: `Seleccionar Tiempo por sesión (actual: ${sessionTime})`,
      location: `Seleccionar Lugar preferido (actual: ${location})`,
      commitment: `Seleccionar Compromiso (actual: ${commitment})`,
      health: `Seleccionar Salud y limitaciones (actual: ${health})`,
    }),
    [commitment, frequency, health, level, location, objective, sessionTime],
  );

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
              options={routineFrequencyOptions}
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
            <SelectBox
              value={health}
              options={routineHealthOptions}
              onValueChange={setHealth}
              className="w-full"
              triggerAriaLabel={aria.health}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>
        </div>

        <div className="flex w-full justify-center">
          <Button
            className={cn(isMobile ? "w-full" : "shrink-0")}
            size="sm"
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
            Aplicar cambios
          </Button>
        </div>
      </div>
    </section>
  );
}

