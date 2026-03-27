"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useMemo, useState } from "react";

import { Button, FormField, SelectBox } from "@/components/ui";
import { cn } from "@/lib/utils";

import { adjustRoutineAssets } from "./adjust-routine-assets";

export type AdjustRoutineCardProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  device?: "desktop" | "tablet" | "mobile";
};

const objectiveOptions = ["Resistencia", "Velocidad", "Potencia"] as const;
const levelOptions = ["Principiante", "Intermedio", "Avanzado"] as const;
const frequencyOptions = ["2 días", "3 días", "4 días", "5 días"] as const;
const sessionTimeOptions = ["30 min", "45 min", "60 min", "75 min"] as const;
const locationOptions = ["Exterior", "Interior"] as const;
const commitmentOptions = ["Bajo", "Medio", "Alto"] as const;
const healthOptions = ["Nada", "Molestias", "Lesiones previas"] as const;

export function AdjustRoutineCard({
  className,
  device = "desktop",
  ...props
}: AdjustRoutineCardProps) {
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const [objective, setObjective] = useState<string>("Resistencia");
  const [level, setLevel] = useState<string>("Principiante");
  const [frequency, setFrequency] = useState<string>("3 días");
  const [sessionTime, setSessionTime] = useState<string>("45 min");
  const [location, setLocation] = useState<string>("Exterior");
  const [commitment, setCommitment] = useState<string>("Medio");
  const [health, setHealth] = useState<string>("Nada");

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
        "bg-[#e0eaff] content-stretch flex flex-col gap-[24px] lg:gap-[32px] items-start overflow-hidden relative rounded-[24px] w-full max-w-[1232px]",
        isMobile ? "p-[16px]" : "p-[24px]",
        className,
      )}
      role="region"
      aria-label="¿Cambio de planes? Reajusta rápido."
    >
      <div
        className={cn(
          "font-bold justify-center leading-0 relative shrink-0 text-foreground-strong w-full",
          isMobile ? "text-[20px]" : "text-[24px]",
        )}
      >
        <p className="leading-[32px]">¿Cambio de planes? Reajusta rápido.</p>
      </div>

      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
        <div
          className={cn(
            "relative shrink-0 w-full",
            isMobile
              ? "flex flex-col gap-[10px] items-start"
              : isTablet
                ? "grid grid-cols-2 gap-x-[20px] gap-y-[20px] lg:gap-x-[24px] lg:gap-y-[24px]"
                : "grid grid-cols-4 gap-x-[24px] gap-y-[24px]",
          )}
        >
          <FormField className="w-full" label="Objetivo">
            <SelectBox
              value={objective}
              options={objectiveOptions}
              onValueChange={setObjective}
              className="w-full"
              triggerAriaLabel={aria.objective}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Nivel">
            <SelectBox
              value={level}
              options={levelOptions}
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
              options={sessionTimeOptions}
              onValueChange={setSessionTime}
              className="w-full"
              triggerAriaLabel={aria.sessionTime}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Lugar preferido">
            <SelectBox
              value={location}
              options={locationOptions}
              onValueChange={setLocation}
              className="w-full"
              triggerAriaLabel={aria.location}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Compromiso">
            <SelectBox
              value={commitment}
              options={commitmentOptions}
              onValueChange={setCommitment}
              className="w-full"
              triggerAriaLabel={aria.commitment}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>

          <FormField
            className={cn(
              "w-full",
              // In Figma desktop/tablet this field spans wider.
              isMobile ? undefined : isTablet ? "col-span-2" : "col-span-2",
            )}
            label="Salud y limitaciones"
          >
            <SelectBox
              value={health}
              options={healthOptions}
              onValueChange={setHealth}
              className="w-full"
              triggerAriaLabel={aria.health}
              arrowIconSrc={adjustRoutineAssets.selectArrow}
            />
          </FormField>
        </div>

        <div className="content-stretch flex items-start justify-center relative shrink-0 w-full">
          <Button
            className={cn(isMobile ? "w-full" : "w-[156px]")}
            size="sm"
            icon={
              <img
                src={adjustRoutineAssets.sparkles}
                alt=""
                aria-hidden="true"
                className="size-4"
                loading="lazy"
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

