import * as React from "react";
import type { SVGProps } from "react";
const SvgInfoCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 21.2 21.2"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="var(--stroke-0, #616983)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M10.6 20.6c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10"
    />
  </svg>
);
export default SvgInfoCircle;
