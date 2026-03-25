import * as React from "react";
import type { SVGProps } from "react";
const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 19.2 19.2"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="var(--stroke-0, #616983)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M1.112 6.6A9 9 0 0 1 9.6.6a9 9 0 1 1 0 18 9 9 0 0 1-8.294-5.5m5.294-.5h-3c-1.414 0-2.121 0-2.56.44C.6 13.478.6 14.185.6 15.6v3"
    />
  </svg>
);
export default SvgRefresh;
