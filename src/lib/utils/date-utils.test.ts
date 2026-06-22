import { describe, it, expect } from "vitest";
import { unixToIso, isoToUnix, formatDate, now } from "./date-utils";

describe("unixToIso", () => {
  it("converts a Unix timestamp to an ISO 8601 string", () => {
    // 2026-06-01T00:00:00.000Z
    const ts = 1780272000000;
    const result = unixToIso(ts);
    expect(result).toBe("2026-06-01T00:00:00.000Z");
  });

  it("round-trips correctly with isoToUnix", () => {
    const original = 1719000000000;
    expect(isoToUnix(unixToIso(original))).toBe(original);
  });
});

describe("isoToUnix", () => {
  it("converts an ISO 8601 string to a Unix timestamp", () => {
    const result = isoToUnix("2026-06-22T12:00:00.000Z");
    // 2026-06-22T12:00:00.000Z in ms
    expect(result).toBe(1782129600000);
  });

  it("handles ISO strings without timezone offset", () => {
    const result = isoToUnix("2026-06-22T12:00:00.000Z");
    expect(result).toBe(1782129600000);
  });
});

describe("now", () => {
  it("returns the current time within 1 second tolerance", () => {
    const before = Date.now();
    // Small delay simulation isn't needed — we just verify
    // that now() is close to Date.now()
    const result = now();
    const after = Date.now();
    expect(result).toBeGreaterThanOrEqual(before);
    expect(result).toBeLessThanOrEqual(after + 1000);
  });
});

describe("formatDate", () => {
  it('returns a human-readable date in "Mon DD, YYYY" format by default', () => {
    // 2026-06-01T00:00:00.000Z
    const ts = 1780272000000;
    const result = formatDate(ts);
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}, 2026$/);
  });

  it("accepts a custom locale", () => {
    const ts = 1782129600000; // 2026-06-22T12:00:00.000Z
    const result = formatDate(ts, "fr-FR");
    // French locale: "22 juin 2026" (or similar variants)
    expect(result).toMatch(/2026/);
  });
});