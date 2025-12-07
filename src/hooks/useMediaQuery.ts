import { useState, useEffect } from "react";

/**
 * Custom hook to detect media query matches
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(media.matches);

    // Create listener for changes
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * Convenience hook to detect mobile viewport
 * @returns boolean indicating if viewport is mobile (< 1024px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 1023px)"); // Below lg breakpoint (1024px)
}
