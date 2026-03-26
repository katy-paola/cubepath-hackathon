import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type MiniChartProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export function MiniChart({ className, ...props }: MiniChartProps) {
  return (
    <div
      {...props}
      className={cn("relative flex h-[32px] gap-[4px] items-end", className)}
      aria-hidden="true"
    >
      <div className="bg-[rgba(0,73,230,0.2)] h-[12px] w-[8px] rounded-tl-[2px] rounded-tr-[2px]" />
      <div className="bg-[rgba(0,73,230,0.2)] h-[20px] w-[8px] rounded-tl-[2px] rounded-tr-[2px]" />
      <div className="bg-[rgba(0,73,230,0.2)] h-[16px] w-[8px] rounded-tl-[2px] rounded-tr-[2px]" />
      <div className="bg-[#0049e6] h-[32px] w-[8px] rounded-tl-[2px] rounded-tr-[2px]" />
    </div>
  );
}

