import * as React from "react";
import type { SVGProps } from "react";
const SvgInfoLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 1.2 5.7"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="var(--stroke-0, #616983)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M.6 5.1V.6"
    />
  </svg>
);
export default SvgInfoLine;
