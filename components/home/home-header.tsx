import type { ComponentPropsWithoutRef } from "react";

import { SlidersHorizontal } from "@/components/icons";
import { StridiaLogo } from "@/components/brand/stridia-logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export type HomeHeaderProps = Omit<
  ComponentPropsWithoutRef<"header">,
  "children"
> & {
  actionLabel?: string;
};

export function HomeHeader({
  actionLabel = "Ajustar rutina",
  className,
  ...props
}: HomeHeaderProps) {
  return (
    <header
      {...props}
      className={cn("w-full border-b border-border-subtle bg-card", className)}
    >
      <div className="mx-auto flex w-full max-w-[1232px] items-center justify-between px-[24px] py-[24px]">
        <StridiaLogo />
        <Button
          icon={<SlidersHorizontal className="size-4" />}
          size="sm"
          variant="secondary"
        >
          {actionLabel}
        </Button>
      </div>
    </header>
  );
}

