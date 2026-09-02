// src/components/ui/Reveal/Reveal.jsx
import React from "react";
import { useReveal } from "@/hooks/useReveal";
import "@/components/AnimatedSection/AnimatedSection.css";

/**
 * Wraps content and fades / slides it up the first time it scrolls into view.
 *
 * props:
 *   as        — element/tag to render (default "div")
 *   delay     — ms stagger before the transition starts
 *   className
 */
export default function Reveal({
  as = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const Tag = as;
  const { ref, shown } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal--in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
