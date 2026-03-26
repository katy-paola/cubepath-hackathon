import type { ButtonHTMLAttributes } from "react";

import { Info } from "@/components/icons";
import { cn } from "@/lib/utils";

export type InfoIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  tooltipText?: string;
  ariaLabel?: string;
  size?: number;
};

export function InfoIconButton({
  tooltipText,
  ariaLabel,
  size = 16,
  className,
  ...props
}: InfoIconButtonProps) {
  const resolvedAriaLabel = ariaLabel ?? tooltipText ?? "Info";

  return (
    <button
      type="button"
      className={cn(
        "bg-transparent p-0 text-muted-foreground cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      title={tooltipText}
      aria-label={resolvedAriaLabel}
      {...props}
    >
      <Info size={size} className="text-muted-foreground" />
    </button>
  );
}

