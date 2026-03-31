import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { Refresh, TradeUpCompact } from "@/components/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export type WorkoutSectionDay = {
  slug: string;
  day: string;
  name: string;
  numeroDia: number;
  borderClass?: string;
  statusLabel?: string;
  locked?: boolean;
};

export type WorkoutSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  device?: "desktop" | "tablet" | "mobile";
  days?: WorkoutSectionDay[];
  onReset?: () => void | Promise<void>;
  onRefresh?: () => void | Promise<void>;
  onCompleteDay?: (numeroDia: number) => void | Promise<void>;
  refreshLoading?: boolean;
};

export function WorkoutSection({
  className,
  device = "desktop",
  days,
  onCompleteDay,
  onReset,
  onRefresh,
  refreshLoading = false,
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
          isMobile
            ? "flex flex-col items-start gap-4"
            : "flex items-end justify-between",
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
          {onReset ? (
            <Button
              variant="secondary"
              className={cn(
                "rounded-xl px-4 py-2 text-base leading-6",
                isMobile ? "flex-1 justify-center" : undefined,
              )}
              icon={<Refresh className="size-4" />}
              onClick={onReset}
            >
              Reiniciar
            </Button>
          ) : null}
          {onRefresh ? (
            <Button
              variant="secondary"
              className={cn(
                "rounded-xl px-4 py-2 text-base leading-6 opacity-70 hover:bg-secondary",
                isMobile ? "flex-1 justify-center" : undefined,
              )}
              icon={<TradeUpCompact className="size-4" />}
              onClick={onRefresh}
              disabled={refreshLoading}
            >
              {refreshLoading ? "Generando..." : "Actualizar"}
            </Button>
          ) : null}
        </div>
      </div>

      <div className={cn("grid w-full", gridClasses)}>
        {(days ?? []).map((day) => (
          <article
            key={day.slug}
            className={cn(
              "relative flex min-h-27 flex-col items-start justify-between rounded-3xl border-2 bg-page-shell transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-page-shell",
              day.borderClass ?? "border-border",
              day.locked ? "opacity-60" : undefined,
            )}
            inert={day.locked ? true : undefined}
          >
            {day.locked ? (
              <div className="w-full h-full p-4.5 cursor-not-allowed">
                <div className="w-full">
                  <p className="text-xs font-medium uppercase leading-4 text-muted-foreground">
                    {day.day}
                  </p>
                  <p className="text-xl font-medium leading-7.5 text-heading">
                    {day.name}
                  </p>
                </div>
              </div>
            ) : (
              <Link
                href={`/rutina/${day.slug}`}
                className="w-full h-full p-4.5"
              >
                <div className="w-full">
                  <p className="text-xs font-medium uppercase leading-4 text-muted-foreground">
                    {day.day}
                  </p>
                  <p className="text-xl font-medium leading-7.5 text-heading">
                    {day.name}
                  </p>
                </div>
              </Link>
            )}
            {day.statusLabel === "Completado" ? (
              <span className="absolute left-4.5 bottom-4.5 whitespace-nowrap text-base font-bold leading-6 text-success-ink">
                Completado
              </span>
            ) : (
              day.statusLabel === "Completar día" && (
                <button
                  type="button"
                  className="absolute left-4.5 bottom-4.5 whitespace-nowrap text-base font-bold leading-6 text-success-ink underline hover:no-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCompleteDay?.(day.numeroDia);
                  }}
                >
                  Completar día
                </button>
              )
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
