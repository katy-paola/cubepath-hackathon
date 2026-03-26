import type { ComponentPropsWithoutRef } from "react";

import {
  AppHeader,
  StridiaLogo,
} from "@/components/brand";
import {
  FormField,
  SelectContent,
  SelectItem,
  SelectBox,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export type StridiaSharedProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  goalOptions?: readonly string[];
  selectedGoalIndex?: number;
  formLabel?: string;
  selectedGoalValue?: string;
  headerActionLabel?: string;
};

/**
 * Composite extracted from the Figma "1. Shared" node.
 * Uses the project's existing UI primitives for fidelity.
 */
export function StridiaShared({
  goalOptions = ["Resistencia", "Resistencia", "Resistencia"] as const,
  selectedGoalIndex = 1,
  formLabel = "Label",
  selectedGoalValue,
  headerActionLabel = "Ajustar rutina",
  className,
  ...props
}: StridiaSharedProps) {
  const resolvedSelectedGoalValue =
    selectedGoalValue ?? goalOptions?.[0] ?? "Resistencia";

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-[22px] items-start relative",
        className,
      )}
      {...props}
    >
      <div className="flex w-full justify-start">
        <SelectContent className="w-[162px]">
          {goalOptions.map((option, index) => (
            <SelectItem key={`${option}-${index}`} selected={index === selectedGoalIndex}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </div>

      <FormField className="w-[162px]" label={formLabel}>
        <SelectBox
          value={resolvedSelectedGoalValue}
          options={goalOptions}
          className="w-full"
          triggerAriaLabel={`Seleccionar ${formLabel} (actual: ${resolvedSelectedGoalValue})`}
        />
      </FormField>

      <AppHeader className="w-[576px]" actionLabel={headerActionLabel} />
    </div>
  );
}

// Re-export to make usage in pages convenient.
export { StridiaLogo };

