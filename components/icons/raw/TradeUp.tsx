import * as React from "react";
import type { SVGProps } from "react";
const SvgTradeUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 17.2 9.2"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="var(--stroke-0, #616983)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M16.6 5.6v-5m0 0h-5m5 0-5 5c-.883.883-1.324 1.324-1.865 1.373q-.135.012-.27 0c-.541-.05-.982-.49-1.865-1.373S6.276 4.276 5.735 4.227a1.5 1.5 0 0 0-.27 0c-.541.05-.982.49-1.865 1.373l-3 3"
    />
  </svg>
);
export default SvgTradeUp;
