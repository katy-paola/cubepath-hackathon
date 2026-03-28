import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { SlidersHorizontal } from "@/components/icons";
import { StridiaLogo } from "@/components/brand/stridia-logo";
import { Button } from "@/components/ui/button";
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
      <div className="mx-auto flex w-full max-w-page items-center justify-between px-4 py-6 md:px-6">
        <nav aria-label="Inicio" className="flex items-center">
          <Link href="/" className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm">
            <span className="md:hidden">
              <StridiaLogo variant="small" />
            </span>
            <span className="hidden md:inline-flex">
              <StridiaLogo />
            </span>
            <span className="sr-only">Stridia — inicio</span>
          </Link>
        </nav>
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

