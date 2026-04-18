import { useState, useEffect, useCallback } from "react";

/**
 * Hook to detect when the visible card's content exceeds visible bounds using ResizeObserver.
 * Returns true if content overflows, false otherwise.
 */
export function useVisibleCardOverflow(
  contentElement: HTMLElement | null,
  cardContainerElement: HTMLElement | null,
  dependencies: unknown[] = [],
): boolean {
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    if (!contentElement || !cardContainerElement) {
      setHasOverflow(false);
      return;
    }

    // Check if content or container has overflow (with small tolerance)
    const contentOverflows = contentElement.scrollHeight > contentElement.clientHeight + 2;
    const containerOverflows = cardContainerElement.scrollHeight > cardContainerElement.clientHeight + 2;

    setHasOverflow(contentOverflows || containerOverflows);
  }, [contentElement, cardContainerElement]);

  useEffect(() => {
    checkOverflow();

    if (!contentElement || !cardContainerElement) return;

    const resizeObserver = new ResizeObserver(() => {
      // Small delay to let layout settle
      setTimeout(checkOverflow, 0);
    });

    resizeObserver.observe(contentElement);
    resizeObserver.observe(cardContainerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkOverflow, contentElement, cardContainerElement, ...dependencies]);

  return hasOverflow;
}
