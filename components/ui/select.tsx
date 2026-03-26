import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { ArrowDown } from "@/components/icons";
import { cn } from "@/lib/utils";

type SelectTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "type"
> & {
  open?: boolean;
  value: string;
  arrowIconSrc?: string;
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
  arrowIconSrc,
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
      {arrowIconSrc ? (
        <img
          alt=""
          aria-hidden="true"
          src={arrowIconSrc}
          className={cn(
            "size-[24px] transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      ) : (
        <ArrowDown
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          size={24}
        />
      )}
    </button>
  );
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent({ className, role = "listbox", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("overflow-hidden rounded-b-[12px] border border-border", className)}
        role={role}
        {...props}
      />
    );
  },
);

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(
    { className, selected = false, role = "option", ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        aria-selected={selected}
        className={cn(
          "border-t border-border pl-4 pr-2 py-3 text-base leading-6 font-medium text-foreground-soft first:border-t-0",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          selected ? "bg-secondary" : "bg-card",
          className,
        )}
        role={role}
        {...props}
      />
    );
  },
);

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
