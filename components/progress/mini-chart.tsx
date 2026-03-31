import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type MiniChartProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export function MiniChart({ className, ...props }: MiniChartProps) {
  return (
    <div
      {...props}
      className={cn("relative flex h-8 gap-1 items-end", className)}
      aria-hidden="true"
    >
      <div className="h-3 w-2 rounded-t bg-primary/20" />
      <div className="h-5 w-2 rounded-t bg-primary/20" />
      <div className="h-4 w-2 rounded-t bg-primary/20" />
      <div className="h-8 w-2 rounded-t bg-primary" />
    </div>
  );
}
