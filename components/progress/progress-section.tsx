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
        "flex flex-col items-start relative w-full max-w-[1232px]",
        isMobile ? "gap-[16px]" : "gap-[24px] lg:gap-[32px]",
        className,
      )}
      role="region"
      aria-label="Progreso semanal"
    >
      <div className="flex flex-col items-start leading-0 relative shrink-0 whitespace-nowrap">
        <div
          className={cn(
            "font-medium justify-center relative shrink-0 text-primary-hover",
            isMobile ? "text-[12px]" : "text-[14px]",
          )}
        >
          <p className="leading-[24px]">MÉTRICAS EN VIVO</p>
        </div>
        <div
          className={cn(
            "font-bold justify-center relative shrink-0 text-foreground-strong",
            isMobile ? "text-[24px]" : "text-[30px]",
          )}
        >
          <p className={cn(isMobile ? "leading-[30px]" : "leading-[30px]")}>
            Progreso semanal
          </p>
        </div>
      </div>

      <div
        className={cn(
          "relative shrink-0 w-full",
          isStacked
            ? "flex flex-col gap-[16px] items-start"
            : "grid grid-cols-3 gap-x-[16px] gap-y-[16px]",
        )}
      >
        <ProgressCard type="consistencia" className={cn(isStacked && "max-w-none")} />
        <ProgressCard type="tiempo" className={cn(isStacked && "max-w-none")} />
        <ProgressCard type="intensidad" className={cn(isStacked && "max-w-none")} />
      </div>
    </section>
  );
}

