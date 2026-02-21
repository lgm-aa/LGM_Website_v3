// src/components/ScrollToAnchor/ScrollToAnchor.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToAnchor() {
  const { pathname, hash, key } = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // If there is no hash, scroll to top and mark as no longer initial load
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      isInitialLoad.current = false;
      return;
    }

    // Wait a tiny bit for the page to render fully
    const timeout = setTimeout(() => {
      // Find the element by ID (remove the '#' from the string)
      const element = document.getElementById(hash.replace("#", ""));

      if (element) {
        // Use instant for fresh page load (QR code), smooth for internal nav
        const behavior = isInitialLoad.current ? "instant" : "smooth";

        element.scrollIntoView({
          behavior,
          block: "start",
        });

        // Clean the URL immediately after the scroll starts
        // This removes the #hash but keeps the page where it is.
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }

      isInitialLoad.current = false;
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, hash, key]);

  return null;
}
