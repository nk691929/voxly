import { describe, expect, it } from "vitest";
import {
  PLANS,
  checkTranscription,
  isLanguageCode,
  languageName,
  remainingMinutes,
} from "../../src/config/plans";

describe("plans", () => {
  it("free plan is smaller than pro", () => {
    expect(PLANS.free.monthlyMinutes).toBeLessThan(PLANS.pro.monthlyMinutes);
  });

  it("calculates remaining minutes and never goes negative", () => {
    expect(remainingMinutes("free", 10)).toBe(20);
    expect(remainingMinutes("free", 999)).toBe(0);
    expect(remainingMinutes("free", -5)).toBe(30);
    expect(remainingMinutes("free", Number.NaN)).toBe(30);
  });

  it("allows a normal recording", () => {
    expect(checkTranscription("free", 0, 120).ok).toBe(true);
  });

  it("blocks recordings that are too long for the plan", () => {
    const result = checkTranscription("free", 0, PLANS.free.maxRecordingSeconds + 1);
    expect(result.ok).toBe(false);
  });

  it("blocks when not enough minutes remain", () => {
    const result = checkTranscription("free", 29.5, 120);
    expect(result.ok).toBe(false);
  });

  it("rejects invalid durations", () => {
    expect(checkTranscription("free", 0, 0).ok).toBe(false);
    expect(checkTranscription("free", 0, -3).ok).toBe(false);
    expect(checkTranscription("free", 0, Number.NaN).ok).toBe(false);
  });

  it("recognizes supported languages", () => {
    expect(isLanguageCode("ur")).toBe(true);
    expect(isLanguageCode("xx")).toBe(false);
    expect(languageName("fr")).toBe("French");
    expect(languageName("xx")).toBe(undefined);
  });
});
