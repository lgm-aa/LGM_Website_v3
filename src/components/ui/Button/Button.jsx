import React from "react";
import "./Button.css";

/**
 * Props:
 * - as: "button" | "a" (default "button")
 * - href: string (when as="a")
 * - variant: "primary" | "ghost"
 * - size: "md" | "lg"
 */
export default function Button({
  as = "button",
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const Cmp = as === "a" ? "a" : "button";
  return (
    <Cmp
      {...rest}
      href={as === "a" ? href ?? "#" : undefined}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </Cmp>
  );
}
