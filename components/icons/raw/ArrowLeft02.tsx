import * as React from "react";
import type { SVGProps } from "react";

const SvgArrowLeft02 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    overflow="visible"
    preserveAspectRatio="none"
    style={{
      display: "block",
    }}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="var(--stroke-0, #50607C)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.5 12.002H19M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195"
    />
  </svg>
);

export default SvgArrowLeft02;
