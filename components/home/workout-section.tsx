import type { ComponentPropsWithoutRef } from "react";

import { Refresh, TradeUp } from "@/components/icons";
import { TrainingDayCard } from "@/components/training";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export type WorkoutSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  device?: "desktop" | "tablet" | "mobile";
};

export function WorkoutSection({
  className,
  device = "desktop",
  ...props
}: WorkoutSectionProps) {
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const isStacked = isTablet || isMobile;

  return (
    <section
      {...props}
      className={cn("flex flex-col gap-[24px] w-full", className)}
      role="region"
      aria-label="Rutina generada"
    >
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col items-start leading-0 whitespace-nowrap">
          <div className="font-medium text-primary-hover text-[14px]">
            <p className="leading-[24px]">TU PLAN DE ACCIÓN</p>
          </div>
          <div className={cn("font-bold text-foreground-strong", isMobile ? "text-[24px]" : "text-[30px]")}>
            <p className="leading-[30px]">Rutina generada</p>
          </div>
        </div>

        <div className={cn("flex items-start", isMobile ? "gap-[8px]" : "gap-[16px]")}>
          <Button
            variant="secondary"
            size="sm"
            icon={<Refresh className="size-4" />}
          >
            Reiniciar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="opacity-70 hover:bg-secondary"
            icon={<TradeUp className="size-4" />}
          >
            Actualizar
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "w-full",
          isStacked
            ? "flex flex-col gap-[16px]"
            : "flex items-center gap-[24px]",
        )}
      >
        <TrainingDayCard
          device={isMobile ? "mobile" : "desktop"}
          status="completed"
          className={cn(isStacked ? "max-w-none" : undefined)}
        />
        <TrainingDayCard
          device={isMobile ? "mobile" : "desktop"}
          status="completed"
          workoutLabel="Intervalos"
          typeLabel="Tipo: Velocidad"
          intensityTag="ALTA"
          className={cn(isStacked ? "max-w-none" : undefined)}
        />
        <TrainingDayCard
          device={isMobile ? "mobile" : "desktop"}
          status="default"
          workoutLabel="Tirada larga"
          typeLabel="Tipo: Resistencia"
          intensityTag="MODERADA"
          className={cn(isStacked ? "max-w-none" : undefined)}
        />
      </div>
    </section>
  );
}

