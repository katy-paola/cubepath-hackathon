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
      className={cn("flex w-full flex-col gap-6", className)}
      aria-labelledby="workout-section-heading"
    >
      <div className={cn("w-full", isMobile ? "flex flex-col items-start gap-4" : "flex items-end justify-between")}>
        <h2
          id="workout-section-heading"
          className="flex flex-col items-start gap-0 leading-0 whitespace-nowrap"
        >
          <span
            className={cn(
              "block font-medium leading-6 text-primary-hover",
              isMobile ? "text-xs" : "text-sm",
            )}
          >
            TU PLAN DE ACCIÓN
          </span>
          <span
            className={cn(
              "block font-bold leading-8 text-heading",
              isMobile ? "text-2xl" : "text-3xl",
            )}
          >
            Rutina generada
          </span>
        </h2>

        <div
          className={cn(
            "flex items-start",
            isMobile ? "w-full gap-4" : "gap-4",
          )}
        >
          <Button
            variant="secondary"
            size="sm"
            className={cn(isMobile ? "flex-1 justify-center" : undefined)}
            icon={<Refresh className="size-4" />}
          >
            Reiniciar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className={cn(
              "opacity-70 hover:bg-secondary",
              isMobile ? "flex-1 justify-center" : undefined,
            )}
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
            ? "flex flex-col gap-4"
            : "flex items-center gap-6",
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

