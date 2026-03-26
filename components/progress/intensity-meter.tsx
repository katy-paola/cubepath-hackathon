import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { intensityAssets, type IntensityLevel } from "./intensity-assets";

export type IntensityMeterProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  level?: IntensityLevel;
};

export function IntensityMeter({
  level = "low",
  className,
  ...props
}: IntensityMeterProps) {
  const isHigh = level === "high";
  const isMedium = level === "medium";

  return (
    <div
      {...props}
      className={cn(
        "relative h-[12px] w-[20.484px] overflow-clip shrink-0",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-[6.18%_62.69%_67.5%_22.05%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector}
        />
      </div>
      <div className="absolute inset-[18.83%_72.98%_53.8%_10.88%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector1}
        />
      </div>
      <div className="absolute inset-[1.21%_50.96%_76.15%_35.86%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector2}
        />
      </div>
      <div className="absolute inset-[37.73%_81.23%_35.89%_3.51%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector3}
        />
      </div>
      <div className="absolute inset-[6.03%_21.9%_67.62%_63.04%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector4}
        />
      </div>
      <div className="absolute inset-[1.27%_35.67%_76.29%_51.3%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector5}
        />
      </div>
      <div className="absolute inset-[18.82%_10.64%_53.81%_73.28%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector6}
        />
      </div>
      <div className="absolute inset-[61.7%_86.12%_15.87%_0.61%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector7}
        />
      </div>
      <div className="absolute inset-[37.98%_3.25%_35.95%_81.45%]">
        <img
          alt=""
          loading="lazy"
          className="absolute block max-w-none size-full"
          src={intensityAssets.imgVector8}
        />
      </div>

      {/* Middle slash / marks */}
      <div className="absolute inset-[56.11%_-2.95%_10.17%_83.18%] flex items-center justify-center">
        <div className="h-[3.128px] w-[3.134px] rotate-[21.07deg]">
          <div className="relative size-full">
            <img
              alt=""
              loading="lazy"
              className="absolute block max-w-none size-full"
              src={intensityAssets.imgVector9}
            />
          </div>
        </div>
      </div>

      {["low", "medium"].includes(level) && (
        <div
          className={cn(
            "absolute flex items-center justify-center",
            isMedium
              ? "inset-[14.06%_35.12%_-1.55%_41.57%]"
              : "inset-[71.99%_41.67%_0_8.91%]",
          )}
        >
          <div
            className={cn(
              "flex-none h-[3.361px] w-[10.122px]",
              isMedium ? "rotate-[-81.78deg]" : "-scale-y-100 rotate-180",
            )}
          >
            <div className="relative size-full">
              <img
                alt=""
                loading="lazy"
                className="absolute block max-w-none size-full"
                src={isMedium ? intensityAssets.imgVector11 : intensityAssets.imgVector10}
              />
            </div>
          </div>
        </div>
      )}

      {isHigh && (
        <div className="absolute inset-[71.99%_8.72%_0_41.87%]">
          <img
            alt=""
            loading="lazy"
            className="absolute block max-w-none size-full"
            src={intensityAssets.imgVector12}
          />
        </div>
      )}
    </div>
  );
}

