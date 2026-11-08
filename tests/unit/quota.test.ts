import { describe, expect, it } from "vitest";
import { checkQuota, monthStartUtc } from "../../src/lib/usage/quota";

describe("checkQuota", () => {
  it("allows use under the limit and reports what is left", () => {
    const r = checkQuota("generation", 60, 10);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.remaining).toBe(50);
  });
  it("allows the last remaining use", () => {
    expect(checkQuota("transcription", 20, 19).ok).toBe(true);
  });
  it("blocks at the limit and above it", () => {
    expect(checkQuota("transcription", 20, 20).ok).toBe(false);
    expect(checkQuota("transcription", 20, 99).ok).toBe(false);
  });
  it("treats bad numbers as zero used", () => {
    expect(checkQuota("generation", 5, Number.NaN).ok).toBe(true);
    expect(checkQuota("generation", 5, -3).ok).toBe(true);
  });
  it("names what ran out", () => {
    const r = checkQuota("transcription", 20, 20);
    if (!r.ok) expect(r.error).toContain("transcriptions");
    const g = checkQuota("generation", 60, 60);
    if (!g.ok) expect(g.error).toContain("generations");
  });
});

describe("monthStartUtc", () => {
  it("returns the first moment of the month in UTC", () => {
    expect(monthStartUtc(new Date("2026-11-08T15:30:00Z"))).toBe("2026-11-01T00:00:00.000Z");
    expect(monthStartUtc(new Date("2026-12-31T23:59:59Z"))).toBe("2026-12-01T00:00:00.000Z");
  });
});
