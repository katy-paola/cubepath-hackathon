"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useMemo, useState } from "react";

import { Button, FormField, SelectBox } from "@/components/ui";
import { cn } from "@/lib/utils";

import { generateSectionAssets } from "./generate-section-assets";

export type GenerateSectionProps = Omit<
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

export function GenerateSection({
  className,
  device = "desktop",
  ...props
}: GenerateSectionProps) {
  // Default values match the design screenshot.
  const [objective, setObjective] = useState<string>("Resistencia");
  const [level, setLevel] = useState<string>("Principiante");
  const [frequency, setFrequency] = useState<string>("3 días");
  const [sessionTime, setSessionTime] = useState<string>("45 min");
  const [location, setLocation] = useState<string>("Exterior");
  const [commitment, setCommitment] = useState<string>("Medio");
  const [health, setHealth] = useState<string>("Nada");

  const isMobile = device === "mobile";

  // Avoid recreating strings when rendering many selects.
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
      role="region"
      aria-label="Configura tu rutina"
      className={cn(
        "grid gap-x-[24px] gap-y-[24px] grid-cols-1 lg:grid-cols-3 relative w-full max-w-[1232px]",
        className,
      )}
    >
      <div
        className={cn(
          "bg-card border border-border-subtle border-solid content-stretch flex flex-col gap-[20px] lg:gap-[24px] items-start justify-self-stretch p-[20px] lg:p-[24px] relative rounded-[24px] shrink-0 w-full",
          "lg:col-span-2",
        )}
      >
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[24px]">
            <img
              src={generateSectionAssets.slidersHorizontal}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 block max-w-none size-full"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col font-bold justify-center leading-0 relative shrink-0 text-[22px] lg:text-[24px] text-foreground-strong whitespace-nowrap">
            <p className="leading-[32px]">Configura tu rutina</p>
          </div>
        </div>

        <div
          className={cn(
            "border-border border-b border-solid gap-x-[20px] lg:gap-x-[24px] gap-y-[20px] lg:gap-y-[24px] grid grid-cols-1 sm:grid-cols-2 pb-[20px] lg:pb-[24px] relative shrink-0 w-full",
            // On mobile, keep a comfortable tap target.
            isMobile ? "gap-y-[16px]" : undefined,
          )}
        >
          <div className="col-span-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-start shrink-0 w-full">
            <FormField className="w-full" label="Objetivo">
              <SelectBox
                value={objective}
                options={objectiveOptions}
                onValueChange={setObjective}
                className="w-full"
                triggerAriaLabel={aria.objective}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>
          </div>

          <div className="col-span-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-start shrink-0 w-full">
            <FormField className="w-full" label="Nivel">
              <SelectBox
                value={level}
                options={levelOptions}
                onValueChange={setLevel}
                className="w-full"
                triggerAriaLabel={aria.level}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>
          </div>

          <div className="col-span-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-2 self-start shrink-0 w-full">
            <FormField className="w-full" label="Frecuencia semanal">
              <SelectBox
                value={frequency}
                options={frequencyOptions}
                onValueChange={setFrequency}
                className="w-full"
                triggerAriaLabel={aria.frequency}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>
          </div>

          <div className="col-span-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-2 self-start shrink-0 w-full">
            <FormField className="w-full" label="Tiempo por sesión">
              <SelectBox
                value={sessionTime}
                options={sessionTimeOptions}
                onValueChange={setSessionTime}
                className="w-full"
                triggerAriaLabel={aria.sessionTime}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>
          </div>

          <div className="col-span-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-3 self-start shrink-0 w-full">
            <FormField className="w-full" label="Lugar preferido">
              <SelectBox
                value={location}
                options={locationOptions}
                onValueChange={setLocation}
                className="w-full"
                triggerAriaLabel={aria.location}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>
          </div>

          <div className="col-span-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-3 self-start shrink-0 w-full">
            <FormField className="w-full" label="Compromiso">
              <SelectBox
                value={commitment}
                options={commitmentOptions}
                onValueChange={setCommitment}
                className="w-full"
                triggerAriaLabel={aria.commitment}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>
          </div>

          <div className="col-span-1 sm:col-span-2 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-4 self-start shrink-0 w-full">
            <FormField className="w-full" label="Salud y limitaciones">
              <SelectBox
                value={health}
                options={healthOptions}
                onValueChange={setHealth}
                className="w-full"
                triggerAriaLabel={aria.health}
                arrowIconSrc={generateSectionAssets.selectArrow}
              />
            </FormField>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full h-[48px] lg:h-auto"
          icon={
            <img
              src={generateSectionAssets.sparkles}
              alt=""
              aria-hidden="true"
              className="size-4"
              loading="lazy"
            />
          }
        >
          Generar rutina
        </Button>
      </div>

      <div
        className={cn(
          "col-span-1 content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative self-stretch shrink-0 lg:col-span-1",
        )}
      >
        <div className="bg-primary content-stretch flex flex-col gap-[20px] lg:gap-[24px] items-start justify-center overflow-hidden p-[20px] lg:p-[24px] relative rounded-[24px] w-full">
          <div className="bg-[#3374ff] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]">
            <div className="relative shrink-0 size-[24px]">
              <div className="absolute inset-[8.33%_10.42%]">
                <div className="absolute inset-[-3%_-3.16%]">
                  <img
                    src={generateSectionAssets.aiIconPart1}
                    alt=""
                    aria-hidden="true"
                    className="absolute block max-w-none size-full"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute inset-[22.49%_39.58%_43.32%_27.08%]">
                <div className="absolute inset-[-6.09%_-6.25%]">
                  <img
                    src={generateSectionAssets.aiIconPart2}
                    alt=""
                    aria-hidden="true"
                    className="absolute block max-w-none size-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col font-bold justify-center leading-0 relative shrink-0 text-[22px] lg:text-[24px] text-[#f9fafb] w-full min-w-0 lg:min-w-full lg:w-min">
            <p className="leading-[36px]">Tu entrenador digital inteligente</p>
          </div>

          <div className="flex flex-col font-medium justify-center leading-0 relative shrink-0 text-[15px] lg:text-[16px] text-[#eceff3] w-full min-w-0 lg:min-w-full lg:w-min">
            <p className="leading-[26px]">
              Nuestra IA ajusta tu entrenamiento basándose en tu nivel, objetivos y estado diario
              para garantizar un proceso seguro y efectivo.
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[24px]">
                <div className="absolute inset-[8.33%]">
                  <div className="absolute inset-[-3%]">
                    <img
                      src={generateSectionAssets.checkmark}
                      alt=""
                      aria-hidden="true"
                      className="absolute block max-w-none size-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-normal justify-center leading-0 relative shrink-0 text-[16px] text-white whitespace-nowrap">
                <p className="leading-[24px]">Adaptación en tiempo real</p>
              </div>
            </div>

            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[24px]">
                <div className="absolute inset-[8.33%]">
                  <div className="absolute inset-[-3%]">
                    <img
                      src={generateSectionAssets.checkmark}
                      alt=""
                      aria-hidden="true"
                      className="absolute block max-w-none size-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-normal justify-center leading-0 relative shrink-0 text-[16px] text-white whitespace-nowrap">
                <p className="leading-[24px]">Prevención de lesiones</p>
              </div>
            </div>
          </div>

          <div className="absolute content-stretch flex flex-col items-start right-[-20px] lg:right-[-53.45px] top-[-47px]">
            <div className="flex h-[190px] items-center justify-center relative shrink-0 w-[220px]">
              <div className="scale-[1.5]">
                <div className="h-[126.667px] relative w-[146.667px]">
                  <img
                    src={generateSectionAssets.aiIcon}
                    alt=""
                    aria-hidden="true"
                    className="absolute block max-w-none size-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#e0eaff] content-stretch flex flex-col gap-[12px] items-start p-[24px] relative rounded-[24px] shrink-0 w-full">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[24px]">
              <div className="absolute inset-[8.33%]">
                <div className="absolute inset-[-5%]">
                  <img
                    src={generateSectionAssets.ideaIcon}
                    alt=""
                    aria-hidden="true"
                    className="block max-w-none size-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col font-bold justify-center leading-0 relative shrink-0 text-[20px] text-primary-hover whitespace-nowrap">
              <p className="leading-[24px]">Dato del día</p>
            </div>
          </div>

          <div className="flex flex-col font-normal justify-center leading-0 relative shrink-0 text-[14px] text-muted-foreground w-full min-w-0 lg:min-w-full lg:w-min">
            <p className="leading-[21px]">
              Corre a un ritmo suave el 80% de tus sesiones mejora tu resistencia un 12% más rápido
              que el esfuerzo máximo constante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

