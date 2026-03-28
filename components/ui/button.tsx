import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
  icon?: ReactNode;
};

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium transition-[background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "button-primary",
        secondary: "button-secondary",
      },
      size: {
        // Height comes from line-height + vertical padding (no min-height); matches Figma via scale, not fixed px.
        default: "rounded-2xl px-6 py-3 text-base leading-6 lg:py-4",
        sm: "rounded-xl px-6 py-2 text-sm leading-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const iconSizeClasses = {
  default: "size-4",
  sm: "size-4",
} as const;

export function Button({
  children,
  className,
  icon,
  size = "default",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const resolvedSize = size ?? "default";
  const resolvedVariant = variant ?? "primary";

  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ size: resolvedSize, variant: resolvedVariant }),
        className,
      )}
      type={type}
    >
      {icon ?? <Sparkles className={cn(iconSizeClasses[resolvedSize], "shrink-0")} />}
      <span>{children}</span>
    </button>
  );
}

export { buttonVariants };
export type { ButtonProps };
