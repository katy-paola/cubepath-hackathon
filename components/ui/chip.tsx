"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/** Figma: contenedor 12×12; vector + con inset ~16.67% (node add). */
function ChipIconAdd({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute inset-[16.67%] block max-h-none max-w-none",
        className,
      )}
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

/** Figma: contenedor 12×12; vector × con inset 25% (node remove). */
function ChipIconRemove({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute inset-1/4 block max-h-none max-w-none",
        className,
      )}
      aria-hidden
    >
      <path
        d="M6.5 0.5L0.500405 6.4996M6.4996 6.5L0.5 0.500425"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export type ChipProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "onClick"
> & {
  label: string;
  /** Si es true, fondo seleccionado e icono de quitar. */
  selected?: boolean;
  /** Al pulsar el chip (típico: alternar filtro). Si no se pasa, el botón queda deshabilitado. */
  onToggle?: () => void;
  /** Ancho del chip (por defecto = Figma 118px). */
  width?: "fixed" | "fluid";
};

/**
 * Chip de filtro (Stridia / Figma 135:4102 / 135:4172): 118×20, iconos 12px con insets del componente.
 */
export function Chip({
  label,
  selected = false,
  onToggle,
  width = "fixed",
  className,
  disabled,
  type = "button",
  ...props
}: ChipProps) {
  const isStatic = onToggle == null;
  const isDisabled = isStatic || Boolean(disabled);

  return (
    <button
      type={type}
      aria-pressed={selected}
      disabled={isDisabled}
      onClick={onToggle}
      className={cn(
        "inline-flex h-5 shrink-0 items-center justify-between gap-0 rounded-2xl border border-solid py-1 pl-2 pr-[5px] text-left font-sans text-xs font-medium leading-none",
        width === "fluid"
          ? "w-full min-w-0 max-w-none"
          : "w-[118px] min-w-[118px] max-w-[118px]",
        /* Figma: blue/100, blue/300, blue/950 */
        "border-chip-border text-chip-ink scheme-light",
        selected ? "bg-chip-surface-selected" : "bg-chip-surface",
        "transition-[background-color,border-color,color] duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-page-shell",
        isDisabled && "cursor-not-allowed opacity-60",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span
        className="relative inline-flex size-3 shrink-0 text-chip-ink"
        aria-hidden
      >
        {selected ? <ChipIconRemove /> : <ChipIconAdd />}
      </span>
    </button>
  );
}
