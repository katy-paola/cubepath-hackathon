import type { ComponentPropsWithoutRef } from "react";

import { InfoIconButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ExerciseRowProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  label?: string;
  tooltipText?: string;
};

export function ExerciseRow({
  className,
  label = "Trote suave 20 min (Zona 2)",
  tooltipText = "Explicación del ejercicio",
  ...props
}: ExerciseRowProps) {
  return (
    <div
      className={cn(
        "flex w-[244px] items-center justify-between gap-[8px]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-[8px]">
        <div className="size-[6px] rounded-full bg-primary" />
        <p className="whitespace-nowrap text-[14px] font-normal leading-[normal] text-foreground-soft">
          {label}
        </p>
      </div>

      <InfoIconButton
        tooltipText={tooltipText}
        ariaLabel={tooltipText}
        className={cn("shrink-0")}
      />
    </div>
  );
}

