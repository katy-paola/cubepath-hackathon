import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
  SVGProps,
} from "react";

import RawADefault from "./raw/ADefault";
import RawASmall from "./raw/ASmall";
import RawRunDefault from "./raw/RunDefault";
import RawRunSmall from "./raw/RunSmall";
import RawStridDefault from "./raw/StridDefault";
import RawStridSmall from "./raw/StridSmall";

type StridiaLogoVariant = "default" | "small";

type StridiaLogoProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  decorative?: boolean;
  primaryColor?: string;
  accentColor?: string;
  title?: string;
  variant?: StridiaLogoVariant;
};

type RawLogoSvg = (props: SVGProps<SVGSVGElement>) => ReactNode;

type LogoLayout = {
  height: number;
  width: number;
  wordmark: {
    height: number;
    width: number;
  };
  letter: {
    height: number;
    width: number;
  };
  mark: {
    bottom: number;
    left: number;
    size: number;
  };
  markInner: string;
};

const logoLayouts: Record<StridiaLogoVariant, LogoLayout> = {
  default: {
    height: 40,
    width: 161.739,
    wordmark: { width: 108.372, height: 32.598 },
    letter: { width: 24.668, height: 30.052 },
    mark: { left: 104.35, bottom: -1.74, size: 41.739 },
    markInner: "-4.17% -4.69%",
  },
  small: {
    height: 32,
    width: 129.391,
    wordmark: { width: 86.698, height: 26.079 },
    letter: { width: 19.734, height: 24.042 },
    mark: { left: 83.48, bottom: -1.39, size: 33.391 },
    markInner: "-4.17% -4.69%",
  },
};

const baseSvgStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

function RawPiece({
  icon: Icon,
  style,
}: {
  icon: RawLogoSvg;
  style?: CSSProperties;
}) {
  return (
    <Icon aria-hidden focusable="false" style={{ ...baseSvgStyle, ...style }} />
  );
}

export function StridiaLogo({
  accentColor = "#003099",
  decorative = false,
  primaryColor = "#0051FF",
  style,
  title = "Stridia",
  variant = "default",
  ...props
}: StridiaLogoProps) {
  const layout = logoLayouts[variant];
  const Wordmark = variant === "small" ? RawStridSmall : RawStridDefault;
  const Letter = variant === "small" ? RawASmall : RawADefault;
  const Mark = variant === "small" ? RawRunSmall : RawRunDefault;

  return (
    <span
      {...props}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      role={decorative ? undefined : "img"}
      style={{
        position: "relative",
        display: "inline-flex",
        width: layout.width,
        height: layout.height,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "space-between",
        lineHeight: 0,
        verticalAlign: "middle",
        ["--fill-0" as string]: primaryColor,
        ["--stroke-0" as string]: accentColor,
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "relative",
          width: layout.wordmark.width,
          height: layout.wordmark.height,
          flexShrink: 0,
        }}
      >
        <RawPiece icon={Wordmark} />
      </span>

      <span
        aria-hidden
        style={{
          position: "relative",
          width: layout.letter.width,
          height: layout.letter.height,
          flexShrink: 0,
        }}
      >
        <RawPiece icon={Letter} />
      </span>

      <span
        aria-hidden
        style={{
          position: "absolute",
          left: layout.mark.left,
          bottom: layout.mark.bottom,
          width: layout.mark.size,
          height: layout.mark.size,
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: "12.5% 16.67%",
          }}
        >
          <RawPiece
            icon={Mark}
            style={{
              position: "absolute",
              inset: layout.markInner,
            }}
          />
        </span>
      </span>
    </span>
  );
}

export type { StridiaLogoProps, StridiaLogoVariant };
