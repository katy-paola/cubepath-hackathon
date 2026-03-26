"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

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
  arrowIconSrc?: string;
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
  arrowIconSrc,
}: SelectBoxProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const baseId = useId();

  const selectedLabel = value || placeholder || "";

  const selectedIndex = useMemo(() => {
    const idx = options.indexOf(value);
    return idx;
  }, [options, value]);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, selectedIndex]);

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

    // Focus the listbox so arrow keys work immediately.
    // (Options are still focusable for click and screen readers.)
    queueMicrotask(() => listboxRef.current?.focus());
  }, [open]);

  function close() {
    setOpen(false);
  }

  function selectIndex(index: number) {
    const option = options[index];
    if (!option) return;
    onValueChange?.(option);
    close();
  }

  function clampIndex(index: number) {
    if (options.length <= 0) return -1;
    return Math.max(0, Math.min(options.length - 1, index));
  }

  return (
    <div ref={rootRef} className={cn("relative w-[162px]", className)}>
      <SelectTrigger
        value={selectedLabel}
        open={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={triggerClassName}
        aria-label={triggerAriaLabel}
        arrowIconSrc={arrowIconSrc}
      />

      {open && (
        <SelectContent
          className={cn(
            "absolute left-0 right-0 top-full z-10 -mt-px w-full",
            contentClassName,
          )}
          ref={listboxRef}
          tabIndex={0}
          aria-activedescendant={
            activeIndex >= 0 ? `${baseId}-option-${activeIndex}` : undefined
          }
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
              return;
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((idx) => clampIndex((idx < 0 ? 0 : idx + 1)));
              return;
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((idx) => clampIndex((idx < 0 ? 0 : idx - 1)));
              return;
            }

            if (e.key === "Home") {
              e.preventDefault();
              setActiveIndex(clampIndex(0));
              return;
            }

            if (e.key === "End") {
              e.preventDefault();
              setActiveIndex(clampIndex(options.length - 1));
              return;
            }

            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (activeIndex >= 0) selectIndex(activeIndex);
              return;
            }

            if (e.key === "Tab") {
              // Let tab move focus out, but close the popover.
              close();
            }
          }}
        >
          {options.map((option, index) => (
            <SelectItem
              key={`${option}-${index}`}
              id={`${baseId}-option-${index}`}
              selected={index === selectedIndex}
              role="option"
              tabIndex={index === activeIndex ? 0 : -1}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                onValueChange?.(option);
                close();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onValueChange?.(option);
                  close();
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

