import type { HTMLAttributes } from "react";
import Image from "next/image";

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
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[18.83%_72.98%_53.8%_10.88%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector1}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[1.21%_50.96%_76.15%_35.86%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector2}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[37.73%_81.23%_35.89%_3.51%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector3}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[6.03%_21.9%_67.62%_63.04%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector4}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[1.27%_35.67%_76.29%_51.3%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector5}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[18.82%_10.64%_53.81%_73.28%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector6}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[61.7%_86.12%_15.87%_0.61%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector7}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>
      <div className="absolute inset-[37.98%_3.25%_35.95%_81.45%]">
        <div className="relative size-full">
          <Image
            src={intensityAssets.imgVector8}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="24px"
          />
        </div>
      </div>

      {/* Middle slash / marks */}
      <div className="absolute inset-[56.11%_-2.95%_10.17%_83.18%] flex items-center justify-center">
        <div className="h-[3.128px] w-[3.134px] rotate-[21.07deg]">
          <div className="relative size-full">
            <Image
              src={intensityAssets.imgVector9}
              alt=""
              fill
              aria-hidden
              className="object-contain"
              sizes="8px"
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
              <Image
                src={isMedium ? intensityAssets.imgVector11 : intensityAssets.imgVector10}
                alt=""
                fill
                aria-hidden
                className="object-contain"
                sizes="16px"
              />
            </div>
          </div>
        </div>
      )}

      {isHigh && (
        <div className="absolute inset-[71.99%_8.72%_0_41.87%]">
          <div className="relative size-full">
            <Image
              src={intensityAssets.imgVector12}
              alt=""
              fill
              aria-hidden
              className="object-contain"
              sizes="24px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

