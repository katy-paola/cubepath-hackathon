import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
  SVGProps,
} from "react";

import RawArtificialIntelligenceInner from "./raw/ArtificialIntelligenceInner";
import RawArtificialIntelligenceOutline from "./raw/ArtificialIntelligenceOutline";
import RawArrowDown from "./raw/ArrowDown";
import RawArrowLeft02 from "./raw/ArrowLeft02";
import RawInfoCircle from "./raw/InfoCircle";
import RawInfoDot from "./raw/InfoDot";
import RawInfoLine from "./raw/InfoLine";
import RawRefresh from "./raw/Refresh";
import RawSlidersHorizontal from "./raw/SlidersHorizontal";
import RawSparkles from "./raw/Sparkles";
import RawTradeUp from "./raw/TradeUp";

type StridiaIconProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  decorative?: boolean;
  size?: number | string;
  title?: string;
};

type RawIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

const rawSvgStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  color: "inherit",
  pointerEvents: "none",
  ["--stroke-0" as string]: "currentColor",
};

function Absolute({
  children,
  style,
}: {
  children: ReactNode;
  style: CSSProperties;
}) {
  return (
    <span aria-hidden style={{ position: "absolute", ...style }}>
      {children}
    </span>
  );
}

function RawLayer({
  icon: Icon,
  style,
}: {
  icon: RawIcon;
  style: CSSProperties;
}) {
  return (
    <Absolute style={style}>
      <Icon aria-hidden focusable="false" style={rawSvgStyle} />
    </Absolute>
  );
}

function IconRoot({
  children,
  decorative,
  size = 24,
  style,
  title,
  ...props
}: StridiaIconProps & { children: ReactNode }) {
  const ariaLabel = props["aria-label"] ?? title;
  const ariaLabelledBy = props["aria-labelledby"];
  const isDecorative = decorative ?? (!ariaLabel && !ariaLabelledBy);

  return (
    <span
      {...props}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={isDecorative ? undefined : ariaLabel}
      aria-labelledby={isDecorative ? undefined : ariaLabelledBy}
      role={isDecorative ? undefined : "img"}
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
        lineHeight: 0,
        flexShrink: 0,
        verticalAlign: "middle",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function createSingleLayerIcon(
  Icon: RawIcon,
  outerStyle: CSSProperties,
  innerStyle: CSSProperties,
) {
  return function StridiaSingleLayerIcon(props: StridiaIconProps) {
    return (
      <IconRoot {...props}>
        <Absolute style={outerStyle}>
          <RawLayer icon={Icon} style={innerStyle} />
        </Absolute>
      </IconRoot>
    );
  };
}

export const SlidersHorizontal = createSingleLayerIcon(
  RawSlidersHorizontal,
  { inset: "8.33%" },
  { inset: "-3%" },
);

export const ArrowDown = createSingleLayerIcon(
  RawArrowDown,
  { top: "37.5%", right: "25%", bottom: "37.5%", left: "25%" },
  { inset: "-10% -5%" },
);

export const ArrowLeft = createSingleLayerIcon(
  RawArrowLeft02,
  { inset: 0 },
  { inset: 0 },
);

export const Sparkles = createSingleLayerIcon(
  RawSparkles,
  { inset: "8.33%" },
  { inset: "-3%" },
);

export function ArtificialIntelligence(props: StridiaIconProps) {
  return (
    <IconRoot {...props}>
      <Absolute style={{ inset: "8.33% 10.42%" }}>
        <RawLayer
          icon={RawArtificialIntelligenceOutline}
          style={{ inset: "-3% -3.16%" }}
        />
      </Absolute>
      <Absolute
        style={{
          top: "22.49%",
          right: "39.58%",
          bottom: "43.32%",
          left: "27.08%",
        }}
      >
        <RawLayer
          icon={RawArtificialIntelligenceInner}
          style={{ inset: "-6.09% -6.25%" }}
        />
      </Absolute>
    </IconRoot>
  );
}

export function Info(props: StridiaIconProps) {
  return (
    <IconRoot {...props}>
      <Absolute style={{ inset: "8.33%" }}>
        <RawLayer icon={RawInfoCircle} style={{ inset: "-3%" }} />
      </Absolute>
      <RawLayer
        icon={RawInfoLine}
        style={{
          top: "45.42%",
          left: "47.5%",
          width: "5%",
          height: "23.75%",
        }}
      />
      <RawLayer
        icon={RawInfoDot}
        style={{
          top: "30.63%",
          left: "47.29%",
          width: "5.42%",
          height: "5.46%",
        }}
      />
    </IconRoot>
  );
}

export const TradeUp = createSingleLayerIcon(
  RawTradeUp,
  { inset: "8.33%" },
  { inset: "-3%" },
);

export const TradeUpCompact = createSingleLayerIcon(
  RawTradeUp,
  { inset: "33.33% 16.67%" },
  { inset: "-7.5% -3.75%" },
);

export const Refresh = createSingleLayerIcon(
  RawRefresh,
  { inset: "12.5%" },
  { inset: "-3.33%" },
);

export type { StridiaIconProps };
