import type { ComponentPropsWithoutRef } from "react";

import { SlidersHorizontal } from "@/components/icons";
import { cn } from "@/lib/utils";

import { Button } from "../ui";
import { StridiaLogo } from "./stridia-logo";

type AppHeaderProps = Omit<ComponentPropsWithoutRef<"header">, "children"> & {
  actionLabel?: string;
};

export function AppHeader({
  actionLabel = "Ajustar rutina",
  className,
  ...props
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-border-subtle bg-card p-6",
        className,
      )}
      {...props}
    >
      <StridiaLogo />
      <Button
        icon={<SlidersHorizontal className="size-4" />}
        size="sm"
        variant="secondary"
      >
        {actionLabel}
      </Button>
    </header>
  );
}

export type { AppHeaderProps };
