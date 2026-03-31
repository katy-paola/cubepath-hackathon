import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { Refresh, TradeUpCompact } from "@/components/icons";
import { Button } from "@/components/ui";
import { workoutDays } from "@/lib/workout-days";
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
  const gridClasses = isMobile
    ? "grid-cols-1 gap-4"
    : "grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 lg:gap-6";

  return (
    <section
      {...props}
      className={cn("flex w-full flex-col gap-6", className)}
      aria-labelledby="workout-section-heading"
    >
      <div
        className={cn(
          "w-full",
          isMobile ? "flex flex-col items-start gap-4" : "flex items-end justify-between",
        )}
      >
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
            className={cn(
              "rounded-xl px-4 py-2 text-base leading-6",
              isMobile ? "flex-1 justify-center" : undefined,
            )}
            icon={<Refresh className="size-4" />}
          >
            Reiniciar
          </Button>
          <Button
            variant="secondary"
            className={cn(
              "rounded-xl px-4 py-2 text-base leading-6 opacity-70 hover:bg-secondary",
              isMobile ? "flex-1 justify-center" : undefined,
            )}
            icon={<TradeUpCompact className="size-4" />}
          >
            Actualizar
          </Button>
        </div>
      </div>

      <div className={cn("grid w-full", gridClasses)}>
        {workoutDays.map((day) => (
          <Link
            key={day.slug}
            href={`/rutina/${day.slug}`}
            className={cn(
              "flex min-h-[108px] flex-col items-start justify-between rounded-3xl border-2 bg-page-shell p-[18px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-page-shell",
              day.borderClass ?? "border-border",
            )}
          >
            <div className="w-full">
              <p className="text-xs font-medium uppercase leading-4 text-muted-foreground">{day.day}</p>
              <p className="text-xl font-medium leading-[30px] text-heading">{day.name}</p>
            </div>
            {day.statusLabel ? (
              <p className="text-base font-bold leading-6 text-success-ink">{day.statusLabel}</p>
            ) : (
              <span aria-hidden className="h-6" />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

