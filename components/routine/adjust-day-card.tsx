"use client";

import { useMemo, useState } from "react";

import { Sparkles } from "@/components/icons";
import { Button, FormField, SelectBox } from "@/components/ui";
import { cn } from "@/lib/utils";

const energyOptions = ["Media", "Baja", "Alta"] as const;
const timeOptions = ["30min", "45min", "60min"] as const;
const locationOptions = ["Exterior", "Interior"] as const;
const discomfortOptions = ["Nada", "Molestias leves", "Molestias moderadas"] as const;

export function AdjustDayCard({ className }: { className?: string }) {
  const [energy, setEnergy] = useState<string>("Media");
  const [time, setTime] = useState<string>("30min");
  const [location, setLocation] = useState<string>("Exterior");
  const [discomfort, setDiscomfort] = useState<string>("Nada");

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
    <aside className={cn("w-full rounded-2xl bg-secondary p-6", className)} aria-label="Adaptar hoy">
      <div className="flex w-full flex-col gap-8">
        <h3 className="text-[18px] font-bold leading-4 tracking-[1px] text-subdued">Adaptar hoy</h3>

        <div className="flex w-full flex-col items-center gap-8">
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
            variant="secondary"
            size="sm"
            className="w-full opacity-80 md:w-auto"
            icon={<Sparkles className="size-4 text-primary-hover" />}
          >
            Aplicar cambios
          </Button>
        </div>
      </div>
    </aside>
  );
}
