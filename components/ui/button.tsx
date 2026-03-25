import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
  icon?: ReactNode;
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap text-base leading-6 font-medium transition-[background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "button-primary",
        secondary: "button-secondary",
      },
      size: {
        default: "min-h-14 rounded-[16px] px-6 py-4",
        sm: "min-h-10 rounded-[12px] px-4 py-2",
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
