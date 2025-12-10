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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * Convenience hook to detect mobile viewport
 * @returns boolean indicating if viewport is mobile (< 1024px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 1023px)");
}
