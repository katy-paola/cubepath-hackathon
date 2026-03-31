"use client";

import { useState } from "react";

import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type ChipDemoSectionProps = {
  className?: string;
};

const noop = () => {};

/**
 * Demo chips Figma: nodos 135:4102 (default) y 135:4172 (selected), más fila interactiva.
 */
export function ChipDemoSection({ className }: ChipDemoSectionProps) {
  const [molestias, setMolestias] = useState(false);
  const [lesion, setLesion] = useState(true);

  return (
    <section
      className={cn(
        "flex w-full max-w-page flex-col gap-6 rounded-3xl border border-border bg-card p-6",
        className,
      )}
      aria-labelledby="chip-demo-heading"
    >
      <h2
        id="chip-demo-heading"
        className="text-base font-bold leading-6 text-heading"
      >
        Chips
      </h2>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Referencia Figma (118×20)
        </p>
        <div className="flex flex-wrap items-end gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-eyebrow-sm uppercase tracking-wide text-muted-foreground">
              135:4102 — default
            </span>
            <Chip label="Molestias leves" selected={false} onToggle={noop} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-eyebrow-sm uppercase tracking-wide text-muted-foreground">
              135:4172 — selected
            </span>
            <Chip label="Molestias leves" selected onToggle={noop} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-subtle pt-6">
        <p className="text-sm text-muted-foreground">
          Interactivo: pulsa para alternar; + añade, × quita.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Chip
            label="Molestias leves"
            selected={molestias}
            onToggle={() => setMolestias((v) => !v)}
          />
          <Chip
            label="Lesión crónica"
            selected={lesion}
            onToggle={() => setLesion((v) => !v)}
          />
          <Chip label="Solo lectura" selected={false} />
        </div>
      </div>
    </section>
  );
}
