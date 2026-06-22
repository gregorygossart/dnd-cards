import { describe, it, expect } from "vitest";
import { FEATURES, isFeatureEnabled } from "./features";

describe("FEATURES", () => {
  it("has isPremium set to false", () => {
    expect(FEATURES.isPremium).toBe(false);
  });

  it("has enableArtworkSharing set to false", () => {
    expect(FEATURES.enableArtworkSharing).toBe(false);
  });

  it("has enableRemoteShare set to false", () => {
    expect(FEATURES.enableRemoteShare).toBe(false);
  });

  it("has enableMultiCardTypes set to false", () => {
    expect(FEATURES.enableMultiCardTypes).toBe(false);
  });

  it("all feature flags are boolean values", () => {
    for (const key of Object.keys(FEATURES)) {
      const value = FEATURES[key as keyof typeof FEATURES];
      expect(typeof value).toBe("boolean");
    }
  });
});

describe("isFeatureEnabled", () => {
  it("returns false for isPremium", () => {
    expect(isFeatureEnabled("isPremium")).toBe(false);
  });

  it("returns false for enableArtworkSharing", () => {
    expect(isFeatureEnabled("enableArtworkSharing")).toBe(false);
  });

  it("returns false for enableRemoteShare", () => {
    expect(isFeatureEnabled("enableRemoteShare")).toBe(false);
  });

  it("returns false for enableMultiCardTypes", () => {
    expect(isFeatureEnabled("enableMultiCardTypes")).toBe(false);
  });

  it("compiles with strict typing (key must be a known feature flag)", () => {
    // TypeScript should error on unknown keys at compile time
    const result: boolean = isFeatureEnabled("isPremium");
    expect(result).toBe(false);
  });
});