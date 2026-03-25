import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { ArrowDown } from "@/components/icons";
import { cn } from "@/lib/utils";

type SelectTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "type"
> & {
  open?: boolean;
  value: string;
};

type SelectContentProps = ComponentPropsWithoutRef<"div">;

type SelectItemProps = ComponentPropsWithoutRef<"div"> & {
  selected?: boolean;
};

type FormFieldProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children?: ReactNode;
  label: string;
};

export function SelectTrigger({
  className,
  open = false,
  value,
  ...props
}: SelectTriggerProps) {
  return (
    <button
      aria-expanded={open}
      aria-haspopup="listbox"
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-[12px] border border-border bg-card pl-4 pr-2 py-3 text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      type="button"
      {...props}
    >
      <span className="text-base leading-6 font-medium text-foreground-soft">
        {value}
      </span>
      <ArrowDown
        className={cn(
          "text-muted-foreground transition-transform duration-200",
          open && "rotate-180",
        )}
        size={24}
      />
    </button>
  );
}

export function SelectContent({
  className,
  role = "listbox",
  ...props
}: SelectContentProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-b-[12px] border border-border", className)}
      role={role}
      {...props}
    />
  );
}

export function SelectItem({
  className,
  selected = false,
  role = "option",
  ...props
}: SelectItemProps) {
  return (
    <div
      aria-selected={selected}
      className={cn(
        "border-t border-border pl-4 pr-2 py-3 text-base leading-6 font-medium text-foreground-soft first:border-t-0",
        selected ? "bg-secondary" : "bg-card",
        className,
      )}
      role={role}
      {...props}
    />
  );
}

export function FormField({
  children,
  className,
  label,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-base leading-6 font-medium text-foreground-strong">
        {label}
      </p>
      {children}
    </div>
  );
}

export type {
  FormFieldProps,
  SelectContentProps,
  SelectItemProps,
  SelectTriggerProps,
};
