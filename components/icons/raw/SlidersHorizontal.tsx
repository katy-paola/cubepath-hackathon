import * as React from "react";
import type { SVGProps } from "react";
const SvgSlidersHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 17.2 21.2"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="var(--stroke-0, #616983)"
      strokeLinecap="round"
      strokeWidth={1.2}
      d="M.6 3.6h6m3 0h7m-4 4v6m-6-13v6m2 8v6m4-10h4m-16 0h9m-1 7h8m-16 0h5"
    />
  </svg>
);
export default SvgSlidersHorizontal;
