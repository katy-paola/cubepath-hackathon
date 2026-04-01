"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Chip } from "@/components/ui/chip";
import {
  normalizeHealthLimitations,
  type RoutineFormValues,
} from "@/lib/routine-form-mapper";
import {
  routineHealthLimitationCodesOrdered,
  routineHealthLimitationLabel,
} from "@/lib/routine-form-options";
import { cn } from "@/lib/utils";
import type { HealthLimitation } from "@/lib/types/config";

export type HealthLimitationsFieldProps = {
  value: RoutineFormValues["health"];
  onChange: (next: RoutineFormValues["health"]) => void;
  className?: string;
  triggerAriaLabel: string;
  modalTitle?: string;
};

function toggleCode(
  code: HealthLimitation,
  current: readonly HealthLimitation[],
): HealthLimitation[] {
  const set = new Set(current);
  if (set.has(code)) set.delete(code);
  else set.add(code);
  return normalizeHealthLimitations([...set]);
}

/** Mismo trazo que `Chip` (Figma HealthSelect: + junto al placeholder). */
function TriggerPlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4.5 0.5V8.5M8.5 4.5H0.5"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ModalCloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M15 5L5 15M15 15L5 5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HealthLimitationsField({
  value,
  onChange,
  className,
  triggerAriaLabel,
  modalTitle = "Salud y limitaciones",
}: HealthLimitationsFieldProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const applyCloseRef = useRef(false);
  const titleId = useId();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<HealthLimitation[]>(() =>
    normalizeHealthLimitations(value),
  );

  const open = useCallback(() => {
    setDraft(normalizeHealthLimitations(value));
    dialogRef.current?.showModal();
    setDialogOpen(true);
  }, [value]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    function onClose() {
      setDialogOpen(false);
      if (!applyCloseRef.current) {
        setDraft(normalizeHealthLimitations(value));
      }
      applyCloseRef.current = false;
    }
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, [value]);

  const orderedSelected = normalizeHealthLimitations(value);

  function confirm() {
    applyCloseRef.current = true;
    onChange(normalizeHealthLimitations(draft));
    dialogRef.current?.close();
  }

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={dialogOpen}
        aria-label={triggerAriaLabel}
        onClick={open}
        className={cn(
          "flex w-full items-center justify-between gap-4 border border-border bg-card pl-4 pr-2 py-3 text-left rounded-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <span className="min-w-0 flex-1 text-base leading-6 font-medium text-subdued">
          Seleccionar
        </span>
        <span
          className="relative inline-flex size-6 shrink-0 items-center justify-center text-muted-foreground"
          aria-hidden
        >
          <TriggerPlusIcon className="pointer-events-none h-3 w-3" />
        </span>
      </button>

      {orderedSelected.length > 0 ? (
        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Limitaciones seleccionadas"
        >
          {orderedSelected.map((code) => (
            <Chip
              key={code}
              label={routineHealthLimitationLabel(code)}
              selected
              onToggle={() =>
                onChange(
                  normalizeHealthLimitations(
                    orderedSelected.filter((c) => c !== code),
                  ),
                )
              }
            />
          ))}
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        className={cn(
          /* Figma LimitationsModal 136:3596 — 206×232, neutral/100, radius 16 */
          "fixed left-1/2 top-[12vh] z-50 w-[min(206px,calc(100vw-2rem))] -translate-x-1/2",
          "rounded-2xl border-0 bg-secondary p-0 shadow-none",
          "backdrop:bg-black/40",
        )}
        aria-labelledby={titleId}
      >
        {/* pt-40 px-24 pb-24, gap-24 entre lista y acción (node 135:4414 + 136:3533) */}
        <div className="relative flex w-full flex-col gap-6 px-6 pb-6 pt-10">
          <button
            type="button"
            className="absolute right-3 top-3 rounded-md p-0 text-heading hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Cerrar"
            onClick={() => dialogRef.current?.close()}
          >
            <ModalCloseIcon className="size-5" />
          </button>

          <h2 id={titleId} className="sr-only">
            {modalTitle}
          </h2>

          <div
            className="flex w-full flex-col gap-2"
            role="group"
            aria-label="Opciones"
          >
            {routineHealthLimitationCodesOrdered.map((code) => {
              const selected = draft.includes(code);
              return (
                <Chip
                  key={code}
                  width="fluid"
                  label={routineHealthLimitationLabel(code)}
                  selected={selected}
                  onToggle={() => setDraft((d) => toggleCode(code, d))}
                />
              );
            })}
          </div>

          <button
            type="button"
            className={cn(
              /* Action 136:3533: px-16 py-8, radius 12, border blue/700, fondo neutral/100 */
              "w-full rounded-xl border border-primary-hover bg-secondary px-4 py-2 text-center font-sans text-base font-medium leading-6 text-primary-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
            )}
            onClick={confirm}
          >
            Seleccionar
          </button>
        </div>
      </dialog>
    </div>
  );
}
