import React from "react";

export default function SparkleIcon({ className = "", size = 20, title }) {
  const aria = title ? { role: "img" } : { "aria-hidden": "true" };
  return (
    <svg
      {...aria}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d="M32 6l6 14 14 2-11 9 4 14-13-7-13 7 4-14L12 22l14-2 6-14z" />
    </svg>
  );
}

