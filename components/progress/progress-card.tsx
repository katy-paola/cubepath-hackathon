import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { IntensityMeter } from "./intensity-meter";
import { MiniChart } from "./mini-chart";
import { intensityAssets } from "./intensity-assets";

export type ProgressCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  type?: "consistencia" | "tiempo" | "intensidad";
  device?: "desktop" | "tablet" | "mobile";
};

const labelCopy = {
  consistencia: "CONSISTENCIA",
  tiempo: "TIEMPO TOTAL",
  intensidad: "INTENSIDAD",
} as const;

export function ProgressCard({
  type = "consistencia",
  device = "desktop",
  className,
  ...props
}: ProgressCardProps) {
  const isIntensidad = type === "intensidad";
  const isTiempo = type === "tiempo";
  const isMobile = device === "mobile";

  return (
    <div
      className={cn(
        "flex h-full min-h-52 w-full max-w-card-promo flex-col rounded-3xl border border-border-subtle bg-card",
        isMobile ? "p-4" : "p-6",
        className,
      )}
      {...props}
      role="group"
      aria-label={`Progress card: ${type}`}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col gap-3">
        <p className="shrink-0 text-base font-bold leading-normal text-subdued">
          {labelCopy[type]}
        </p>

        {["consistencia", "tiempo"].includes(type) && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="flex gap-1 leading-none">
              <span className="text-2xl font-bold leading-6 text-metric-blue">
                {isTiempo ? "85" : "2 / 3"}
              </span>
              <span className="flex flex-col justify-end pb-0.5 text-base font-normal leading-normal text-muted-foreground">
                {isTiempo ? "min" : "días"}
              </span>
            </div>

            {type === "consistencia" && (
              <div className="w-full shrink-0 rounded-xl bg-border-subtle">
                <div className="h-3 w-2/3 rounded-xl bg-primary-hover" />
              </div>
            )}

            {isTiempo && (
              <div className="flex shrink-0 items-center gap-1">
                <span className="whitespace-nowrap text-base font-medium leading-6 text-trend-positive">
                  +15% vs semana anterior
                </span>
                <span className="relative size-6 shrink-0" aria-hidden>
                  <Image
                    src={intensityAssets.imgVector13}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="24px"
                  />
                </span>
              </div>
            )}
          </div>
        )}

        {isIntensidad && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="flex items-center gap-2">
              <IntensityMeter level="low" className="relative h-3 w-5 shrink-0" />
              <span className="text-sm font-medium uppercase leading-3 text-heading">baja</span>
            </div>
            <div className="flex items-center gap-2">
              <IntensityMeter level="medium" className="relative h-3 w-5 shrink-0" />
              <span className="text-sm font-medium uppercase leading-3 text-primary-hover">
                MODERADA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IntensityMeter level="high" className="relative h-3 w-5 shrink-0" />
              <span className="text-sm font-medium uppercase leading-3 text-heading">ALTA</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto w-full shrink-0 pt-2">
        {type === "consistencia" && (
          <p className="text-xs font-medium leading-normal text-muted-foreground">
            66.6% de la semana completado
          </p>
        )}
        {type === "intensidad" && (
          <p className="text-xs font-medium leading-normal text-muted-foreground">
            Carga de entrenamiento estable
          </p>
        )}
        {isTiempo && <MiniChart className="relative h-8 w-full shrink-0" />}
      </div>
    </div>
  );
}
