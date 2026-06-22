/**
 * ID generation utilities using crypto.randomUUID().
 *
 * This is the ONLY allowed ID generation pattern in the codebase.
 * Do NOT use nanoid, uuid (npm package), or custom counter-based IDs.
 * See architecture.md#ID-Generation-Pattern for details.
 */

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Generates a UUID v4 string using crypto.randomUUID().
 * Compatible with Dexie string primary keys.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Validates whether a string is a valid UUID v4.
 */
export function isValidId(id: string): boolean {
  return UUID_V4_REGEX.test(id);
}

/**
 * Creates a display-friendly short ID with a prefix + first 4 UUID chars.
 * Example: "deck_a1b2", "card_7e9f"
 *
 * @param prefix - A short alphanumeric prefix (e.g. "deck", "card", "char")
 */
export function createShortId(prefix: string): string {
  const uuid = generateId();
  const short = uuid.split("-")[0]?.slice(0, 4) ?? "xxxx";
  return `${prefix}_${short}`;
}