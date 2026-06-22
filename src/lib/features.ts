/**
 * Feature flag definitions.
 *
 * This is the SINGLE source of truth for all feature flags in the codebase.
 * Never add a second feature flag file.
 *
 * All Premium boundaries gate on these flags.
 * See architecture.md#Feature-Flag-Pattern for details.
 */

/**
 * Feature flags defined as `as const` so TypeScript narrows literal types.
 * - `isPremium` — gate for Premium-only features
 * - `enableArtworkSharing` — artwork in share links (Premium)
 * - `enableRemoteShare` — edge function sharing (Premium)
 * - `enableMultiCardTypes` — ItemCard, CapacityCard etc. (future)
 */
export const FEATURES = {
  isPremium: false,
  enableArtworkSharing: false,
  enableRemoteShare: false,
  enableMultiCardTypes: false,
} as const;

/** Inferred type from the FEATURES const object. */
export type FeatureFlags = typeof FEATURES;

/**
 * Runtime check for whether a specific feature is enabled.
 * This makes it easier to swap for an API-driven flag system later.
 *
 * @example
 * ```ts
 * if (isFeatureEnabled('isPremium')) {
 *   // show premium content
 * }
 * ```
 */
export function isFeatureEnabled(key: keyof typeof FEATURES): boolean {
  return FEATURES[key];
}