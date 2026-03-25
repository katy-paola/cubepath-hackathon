import * as React from "react";
import type { SVGProps } from "react";
const SvgSparkles = (props: SVGProps<SVGSVGElement>) => (
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
    <g
      stroke="var(--stroke-0, #616983)"
      strokeLinejoin="round"
      strokeWidth={1.2}
    >
      <path d="m13.6.6.539 2.392a5.39 5.39 0 0 0 4.07 4.07L20.6 7.6l-2.392.539a5.39 5.39 0 0 0-4.07 4.07L13.6 14.6l-.539-2.392a5.39 5.39 0 0 0-4.07-4.07L6.6 7.6l2.392-.539a5.39 5.39 0 0 0 4.07-4.07zM5.6 10.6l.385 1.708a3.85 3.85 0 0 0 2.907 2.907l1.708.385-1.708.385a3.85 3.85 0 0 0-2.907 2.907L5.6 20.6l-.385-1.708a3.85 3.85 0 0 0-2.907-2.907L.6 15.6l1.708-.385a3.85 3.85 0 0 0 2.907-2.907z" />
    </g>
  </svg>
);
export default SvgSparkles;
