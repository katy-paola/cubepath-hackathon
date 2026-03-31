"use client";

import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { SlidersHorizontal } from "@/components/icons";
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

import { generateSectionAssets } from "./generate-section-assets";

export type GenerateSectionProps = Omit<ComponentPropsWithoutRef<"section">, "children">;

export function GenerateSection({ className, ...props }: GenerateSectionProps) {
  const [objective, setObjective] = useState<string>(routineFormDefaults.objective);
  const [level, setLevel] = useState<string>(routineFormDefaults.level);
  const [frequency, setFrequency] = useState<string>(routineFormDefaults.frequency);
  const [sessionTime, setSessionTime] = useState<string>(routineFormDefaults.sessionTime);
  const [location, setLocation] = useState<string>(routineFormDefaults.location);
  const [commitment, setCommitment] = useState<string>(routineFormDefaults.commitment);
  const [health, setHealth] = useState<string>(routineFormDefaults.health);

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

        <div className="relative grid w-full shrink-0 grid-cols-1 gap-4 border-b border-border pb-4 md:grid-cols-2 md:gap-5 md:pb-5 lg:gap-6 lg:pb-6">
          <FormField className="w-full" label="Objetivo">
            <SelectBox
              value={objective}
              options={routineObjectiveOptions}
              onValueChange={setObjective}
              className="w-full"
              triggerAriaLabel={aria.objective}
              arrowIconSrc={generateSectionAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Nivel">
            <SelectBox
              value={level}
              options={routineLevelOptions}
              onValueChange={setLevel}
              className="w-full"
              triggerAriaLabel={aria.level}
              arrowIconSrc={generateSectionAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Frecuencia semanal">
            <SelectBox
              value={frequency}
              options={routineFrequencyOptions}
              onValueChange={setFrequency}
              className="w-full"
              triggerAriaLabel={aria.frequency}
              arrowIconSrc={generateSectionAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Tiempo por sesión">
            <SelectBox
              value={sessionTime}
              options={routineSessionTimeOptions}
              onValueChange={setSessionTime}
              className="w-full"
              triggerAriaLabel={aria.sessionTime}
              arrowIconSrc={generateSectionAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Lugar preferido">
            <SelectBox
              value={location}
              options={routineLocationOptions}
              onValueChange={setLocation}
              className="w-full"
              triggerAriaLabel={aria.location}
              arrowIconSrc={generateSectionAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full" label="Compromiso">
            <SelectBox
              value={commitment}
              options={routineCommitmentOptions}
              onValueChange={setCommitment}
              className="w-full"
              triggerAriaLabel={aria.commitment}
              arrowIconSrc={generateSectionAssets.selectArrow}
            />
          </FormField>

          <FormField className="w-full md:col-span-2" label="Salud y limitaciones">
            <SelectBox
              value={health}
              options={routineHealthOptions}
              onValueChange={setHealth}
              className="w-full"
              triggerAriaLabel={aria.health}
              arrowIconSrc={generateSectionAssets.selectArrow}
            />
          </FormField>
        </div>

        <Button
          variant="primary"
          className="w-full"
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
          Generar rutina
        </Button>
      </article>

      <div className="col-span-1 flex min-h-0 flex-col gap-6 self-stretch justify-self-stretch lg:col-span-1 lg:h-full">
        <article
          aria-labelledby="entrenador-digital-heading"
          className="relative flex min-h-0 w-full flex-1 flex-col items-start gap-4 overflow-hidden rounded-3xl bg-primary p-4 md:gap-5 md:p-5 lg:justify-center lg:gap-6 lg:p-6"
        >
          <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-accent-tile">
            <div className="relative size-6 shrink-0">
              <div className="absolute inset-[8.33%_10.42%]">
                <div className="absolute inset-[-3%_-3.16%]">
                  <div className="relative size-full">
                    <Image
                      src={generateSectionAssets.aiIconPart1}
                      alt=""
                      fill
                      aria-hidden
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute inset-[22.49%_39.58%_43.32%_27.08%]">
                <div className="absolute inset-[-6.09%_-6.25%]">
                  <div className="relative size-full">
                    <Image
                      src={generateSectionAssets.aiIconPart2}
                      alt=""
                      fill
                      aria-hidden
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3
            id="entrenador-digital-heading"
            className="w-full min-w-0 text-xl font-bold leading-9 text-primary-foreground md:text-2xl md:leading-10 lg:w-min lg:min-w-full lg:text-2xl lg:leading-10"
          >
            Tu entrenador digital inteligente
          </h3>

          <p className="w-full min-w-0 text-sm font-medium leading-relaxed text-primary-foreground/90 lg:w-min lg:min-w-full lg:text-base">
            Nuestra IA ajusta tu entrenamiento basándose en tu nivel, objetivos y estado diario para
            garantizar un proceso seguro y efectivo.
          </p>

          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            <li className="flex items-center gap-2">
              <div className="relative size-6 shrink-0">
                <div className="absolute inset-[8.33%]">
                  <div className="absolute inset-[-3%]">
                    <div className="relative size-full">
                      <Image
                        src={generateSectionAssets.checkmark}
                        alt=""
                        fill
                        aria-hidden
                        className="object-contain"
                        sizes="24px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span className="whitespace-nowrap text-base leading-6 text-white">Adaptación en tiempo real</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="relative size-6 shrink-0">
                <div className="absolute inset-[8.33%]">
                  <div className="absolute inset-[-3%]">
                    <div className="relative size-full">
                      <Image
                        src={generateSectionAssets.checkmark}
                        alt=""
                        fill
                        aria-hidden
                        className="object-contain"
                        sizes="24px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span className="whitespace-nowrap text-base leading-6 text-white">Prevención de lesiones</span>
            </li>
          </ul>

          <div className="absolute flex flex-col items-start right-[-20px] lg:right-[-53.45px] top-[-47px]">
            <div className="flex h-[190px] items-center justify-center relative shrink-0 w-[220px]">
              <div className="scale-[1.5]">
                <div className="h-[126.667px] relative w-[146.667px]">
                  <Image
                    src={generateSectionAssets.aiIcon}
                    alt=""
                    fill
                    aria-hidden
                    className="object-contain"
                    sizes="150px"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>

        <aside
          aria-labelledby="dato-del-dia-heading"
          className="flex w-full shrink-0 flex-col gap-3 rounded-3xl bg-hero-surface p-6"
        >
          <div className="flex items-center gap-2">
            <div className="relative size-6 shrink-0">
              <div className="absolute inset-[8.33%]">
                <div className="absolute inset-[-5%]">
                  <div className="relative size-full">
                    <Image
                      src={generateSectionAssets.ideaIcon}
                      alt=""
                      fill
                      aria-hidden
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h4
              id="dato-del-dia-heading"
              className="whitespace-nowrap text-xl font-bold leading-6 text-primary-hover"
            >
              Dato del día
            </h4>
          </div>

          <p className="w-full min-w-0 text-sm leading-relaxed text-muted-foreground lg:w-min lg:min-w-full lg:text-base">
            Corre a un ritmo suave el 80% de tus sesiones mejora tu resistencia un 12% más rápido que
            el esfuerzo máximo constante.
          </p>
        </aside>
      </div>
    </section>
  );
}

