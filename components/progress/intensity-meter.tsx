import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { intensityAssets, type IntensityLevel } from "./intensity-assets";

export type IntensityMeterProps = Omit<
  ComponentPropsWithoutRef<"svg">,
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
    <svg
      {...props}
      className={cn("shrink-0", className)}
      style={{ width: 20.484, height: 12 }}
      viewBox="0 0 20.484 12"
      aria-hidden="true"
      focusable="false"
    >
      {/* Converted from Figma absolute insets to SVG positions to reduce arbitrary Tailwind. */}
      <image href={intensityAssets.imgVector} x={4.516} y={0.742} width={3.136} height={3.16} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector1} x={2.227} y={2.26} width={3.312} height={3.291} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector2} x={7.346} y={0.145} width={2.704} height={2.72} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector3} x={0.719} y={4.528} width={3.13} height={3.158} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector4} x={12.912} y={0.724} width={3.124} height={3.125} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector5} x={10.508} y={0.152} width={2.644} height={2.685} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector6} x={15.011} y={2.258} width={3.232} height={3.275} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector7} x={0.125} y={7.404} width={2.717} height={2.692} preserveAspectRatio="none" />
      <image href={intensityAssets.imgVector8} x={16.685} y={4.558} width={3.244} height={3.248} preserveAspectRatio="none" />

      {/* Middle slash */}
      <g transform="translate(17.037 6.733) rotate(21.07)">
        <image href={intensityAssets.imgVector9} x={-1.567} y={-1.564} width={3.134} height={3.128} preserveAspectRatio="none" />
      </g>

      {/* Level markers */}
      {["low", "medium"].includes(level) ? (
        <g
          transform={
            isMedium
              ? "translate(8.514 1.687) rotate(-81.78)"
              : "translate(5.668 10.639) rotate(180) scale(1,-1)"
          }
        >
          <image
            href={isMedium ? intensityAssets.imgVector11 : intensityAssets.imgVector10}
            x={-5.061}
            y={-1.681}
            width={10.122}
            height={3.361}
            preserveAspectRatio="none"
          />
        </g>
      ) : null}

      {isHigh ? (
        <image
          href={intensityAssets.imgVector12}
          x={8.574}
          y={8.639}
          width={10.124}
          height={3.361}
          preserveAspectRatio="none"
        />
      ) : null}
    </svg>
  );
}
