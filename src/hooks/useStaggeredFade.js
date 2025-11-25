// src/hooks/useStaggeredFade.js
import { useEffect, useState } from "react";

export function useStaggeredFade(
  count,
  { baseDelay = 0, interval = 300 } = {}
) {
  const [entered, setEntered] = useState(() => Array(count).fill(false));

  useEffect(() => {
    const timeouts = Array.from({ length: count }, (_, index) => {
      return setTimeout(() => {
        setEntered((prev) => {
          if (prev[index]) return prev;
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, baseDelay + index * interval);
    });

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [count, baseDelay, interval]);

  const getClassName = (index, extra = "") =>
    `animated-section ${entered[index] ? "entered" : ""} ${extra}`.trim();

  return { entered, getClassName };
}
