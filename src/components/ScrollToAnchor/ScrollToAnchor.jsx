// src/components/ScrollToAnchor/ScrollToAnchor.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToAnchor() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // If there is no hash, do nothing
    if (!hash) return;

    // Wait a tiny bit for the page to render fully
    const timeout = setTimeout(() => {
      // Find the element by ID (remove the '#' from the string)
      const element = document.getElementById(hash.replace("#", ""));

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // 👇 NEW: Clean the URL immediately after the scroll starts
        // This removes the #hash but keeps the page where it is.
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, hash, key]);

  return null;
}
