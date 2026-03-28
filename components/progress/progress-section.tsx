import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { ProgressCard } from "./progress-card";

export type ProgressSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  device?: "desktop" | "tablet" | "mobile";
};

export function ProgressSection({
  className,
  device = "desktop",
  ...props
}: ProgressSectionProps) {
  const isMobile = device === "mobile";
  const isStacked = device === "tablet" || device === "mobile";

  return (
    <section
      {...props}
      className={cn(
        "relative flex w-full max-w-page flex-col items-start",
        isMobile ? "gap-4" : "gap-6 lg:gap-8",
        className,
      )}
      aria-labelledby="progress-section-heading"
    >
      <h2
        id="progress-section-heading"
        className="flex flex-col items-start gap-1 leading-none"
      >
        <span
          className={cn(
            "font-medium leading-6 text-primary-hover",
            isMobile ? "text-xs" : "text-sm",
          )}
        >
          MÉTRICAS EN VIVO
        </span>
        <span
          className={cn(
            "font-bold text-heading",
            isMobile ? "text-2xl leading-8" : "text-3xl leading-8",
          )}
        >
          Progreso semanal
        </span>
      </h2>

      <div
        className={cn(
          "w-full",
          isStacked
            ? "flex flex-col gap-4 items-stretch"
            : "grid grid-cols-3 gap-4 items-stretch",
        )}
      >
        <ProgressCard
          type="consistencia"
          device={device}
          className={cn(isStacked && "max-w-none")}
        />
        <ProgressCard
          type="tiempo"
          device={device}
          className={cn(isStacked && "max-w-none")}
        />
        <ProgressCard
          type="intensidad"
          device={device}
          className={cn(isStacked && "max-w-none")}
        />
      </div>
    </section>
  );
}

