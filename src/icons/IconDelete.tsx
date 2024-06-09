import { IconProps, svgIconProps } from "@buildo/bento-design-system";
// import * as React from "react";

export function IconDelete(props: IconProps) {
  return <svg {...svgIconProps(props)}>{
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m16 9-3 3m0 0-3 3m3-3-3-3m3 3 3 3M8 6h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-6-6z"
      />
    </svg>
  }</svg>;
}
