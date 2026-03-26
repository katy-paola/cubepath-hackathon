import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { IntensityMeter } from "./intensity-meter";
import { MiniChart } from "./mini-chart";
import { intensityAssets } from "./intensity-assets";

// SVG assets moved to `intensity-assets.ts`.

// IntensityMeter and MiniChart are extracted into their own components.

export type ProgressCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  type?: "consistencia" | "tiempo" | "intensidad";
};

export function ProgressCard({
  type = "consistencia",
  className,
  ...props
}: ProgressCardProps) {
  const isIntensidad = type === "intensidad";
  const isTiempo = type === "tiempo";

  const heightClass =
    isIntensidad ? "h-[191px]" : isTiempo ? "h-[200px]" : "h-[171px]";

  return (
    <div
      className={cn(
        // Default matches Figma card width, but stays responsive in narrow containers.
        // Use `className="max-w-none"` for the stacked full-width layout.
        "bg-card border border-border-subtle border-solid content-stretch flex flex-col items-start justify-between p-[25px] relative rounded-[24px] w-full max-w-[394.667px]",
        heightClass,
        className,
      )}
      {...props}
      role="group"
      aria-label={`Progress card: ${type}`}
    >
      <div className="relative shrink-0 w-full" data-section="content">
        <div className="bg-clip-padding border-0 border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
          <div className="flex flex-col justify-center font-bold leading-[0] relative shrink-0 text-[16px] text-foreground-soft w-full">
            <p className="leading-[normal]">
              {isIntensidad ? "INTENSIDAD" : isTiempo ? "TIEMPO TOTAL" : "CONSISTENCIA"}
            </p>
          </div>

          {["consistencia", "tiempo"].includes(type) && (
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] items-end leading-0 relative shrink-0 whitespace-nowrap">
                <div className="flex flex-col font-bold justify-center relative shrink-0 text-[24px] text-[#002066]">
                  <p className="leading-[24px]">{isTiempo ? "85" : "2 / 3"}</p>
                </div>
                <div className="flex flex-col font-normal justify-center relative shrink-0 text-[16px] text-muted-foreground">
                  <p className="leading-[normal]">{isTiempo ? "min" : "días"}</p>
                </div>
              </div>

              {type === "consistencia" && (
                <div className="bg-border-subtle grid grid-cols-2 grid-rows-[repeat(1,fit-content(100%))] relative rounded-[12px] shrink-0 w-full">
                  <div className="bg-primary-hover col-1 h-[12px] justify-self-stretch rounded-[12px] row-1 shrink-0" />
                </div>
              )}

              {isTiempo && (
                <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
                  <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-[#059443] whitespace-nowrap">
                    <p className="leading-[24px]">+15% vs semana anterior</p>
                  </div>
                  <div
                    className="relative shrink-0 size-[24px]"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-[33.33%_16.67%]">
                      <div className="absolute inset-[-7.5%_-3.75%]">
                        <img
                          alt=""
                          loading="lazy"
                          className="block max-w-none size-full absolute"
                          src={intensityAssets.imgVector13}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isIntensidad && (
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <IntensityMeter level="low" className="h-[12px] w-[20.484px] overflow-clip relative shrink-0" />
                <div className="flex flex-col font-medium justify-center leading-0 relative shrink-0 text-[14px] text-foreground-strong uppercase whitespace-nowrap">
                  <p className="leading-[12px]">baja</p>
                </div>
              </div>

              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <IntensityMeter
                  level="medium"
                  className="h-[12px] w-[20.484px] overflow-clip relative shrink-0"
                />
                <div className="flex flex-col font-medium justify-center leading-0 relative shrink-0 text-[14px] text-primary-hover uppercase whitespace-nowrap">
                  <p className="leading-[12px]">MODERADA</p>
                </div>
              </div>

              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <IntensityMeter
                  level="high"
                  className="h-[12px] w-[20.484px] overflow-clip relative shrink-0"
                />
                <div className="flex flex-col font-medium justify-center leading-0 relative shrink-0 text-[14px] text-foreground-strong uppercase whitespace-nowrap">
                  <p className="leading-[12px]">ALTA</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {["consistencia", "intensidad"].includes(type) && (
        <div className="flex flex-col font-medium justify-center leading-0 relative shrink-0 text-[12px] text-muted-foreground w-full">
          <p>
            {isIntensidad
              ? "Carga de entrenamiento estable"
              : "66.6% de la semana completado"}
          </p>
        </div>
      )}

      {isTiempo && <MiniChart className="h-[32px] relative shrink-0" />}
    </div>
  );
}

