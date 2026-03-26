"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { ReactNode } from "react";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./select";
import { cn } from "@/lib/utils";

export type SelectBoxProps = {
  value: string;
  options: readonly string[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  renderOption?: (option: string) => ReactNode;
  triggerAriaLabel?: string;
};

export function SelectBox({
  value,
  options,
  onValueChange,
  placeholder,
  defaultOpen = false,
  className,
  triggerClassName,
  contentClassName,
  renderOption,
  triggerAriaLabel,
}: SelectBoxProps) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel = value || placeholder || "";

  const selectedIndex = useMemo(() => {
    const idx = options.indexOf(value);
    return idx;
  }, [options, value]);

  useEffect(() => {
    if (!open) return;

    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onDocKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onDocKeyDown);

    // Focus the currently selected option for keyboard users.
    const root = rootRef.current;
    if (root) {
      const optionsEls = root.querySelectorAll<HTMLDivElement>(
        '[role="option"]',
      );
      const toFocus = selectedIndex >= 0 ? optionsEls[selectedIndex] : optionsEls[0];
      toFocus?.focus();
    }

    return () => document.removeEventListener("keydown", onDocKeyDown);
  }, [open, selectedIndex]);

  return (
    <div ref={rootRef} className={cn("relative w-[162px]", className)}>
      <SelectTrigger
        value={selectedLabel}
        open={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClassName}
        aria-label={triggerAriaLabel}
      />

      {open && (
        <SelectContent
          className={cn(
            "absolute left-0 right-0 top-full z-10 -mt-px w-full",
            contentClassName,
          )}
        >
          {options.map((option, index) => (
            <SelectItem
              key={`${option}-${index}`}
              selected={index === selectedIndex}
              role="option"
              tabIndex={0}
              onClick={() => {
                onValueChange?.(option);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onValueChange?.(option);
                  setOpen(false);
                }
              }}
              className="cursor-pointer"
            >
              {renderOption ? renderOption(option) : option}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </div>
  );
}

