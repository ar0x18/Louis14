import React from "react";

export default function HeartIcon({ className = "", size = 24, title }) {
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
      <path d="M32 52C32 52 12 36 12 24c0-8 6-12 12-12 6 0 8 4 8 4s2-4 8-4c6 0 12 4 12 12 0 12-20 28-20 28z" />
    </svg>
  );
}

