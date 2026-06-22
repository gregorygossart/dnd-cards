/**
 * Date conversion utilities.
 *
 * All stores use Unix timestamps (number, ms precision).
 * These utilities exist to convert at the UI boundary only.
 * Store code never calls unixToIso() — that's for display components.
 * See architecture.md#Date-Handling-Pattern for details.
 */

/**
 * Converts a Unix timestamp (ms) to an ISO 8601 string.
 * Used at the UI boundary for date display.
 */
export function unixToIso(unixTs: number): string {
  return new Date(unixTs).toISOString();
}

/**
 * Converts an ISO 8601 string to a Unix timestamp (ms).
 * Used at the UI boundary when receiving external date strings.
 */
export function isoToUnix(isoStr: string): number {
  return new Date(isoStr).getTime();
}

/**
 * Returns a human-readable date string (e.g., "Jun 22, 2026").
 *
 * @param unixTs - Unix timestamp in milliseconds
 * @param locale - Optional locale string (defaults to "en-US")
 */
export function formatDate(unixTs: number, locale?: string): string {
  return new Date(unixTs).toLocaleDateString(locale ?? "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Returns the current Unix timestamp in milliseconds.
 */
export function now(): number {
  return Date.now();
}