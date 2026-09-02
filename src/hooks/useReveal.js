// src/hooks/useReveal.js
import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll. Adds `shown = true` once the element first enters the
 * viewport, then stops observing. Squarespace-style fade / slide-up.
 */
export function useReveal({ threshold = 0, rootMargin = "0px 0px -12%" } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (old browsers / SSR) → just show it.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, shown };
}

export default useReveal;
