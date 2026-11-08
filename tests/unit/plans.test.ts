import { describe, expect, it } from "vitest";
import { PLANS, isLanguageCode, languageName } from "../../src/config/plans";

describe("plans", () => {
  it("free plan is smaller than pro", () => {
    expect(PLANS.free.monthlyTranscriptions).toBeLessThan(PLANS.pro.monthlyTranscriptions);
    expect(PLANS.free.monthlyGenerations).toBeLessThan(PLANS.pro.monthlyGenerations);
  });
  it("every limit is a positive number", () => {
    for (const plan of Object.values(PLANS)) {
      expect(plan.monthlyTranscriptions).toBeGreaterThan(0);
      expect(plan.monthlyGenerations).toBeGreaterThan(0);
      expect(plan.maxRecordingSeconds).toBeGreaterThan(0);
      expect(plan.maxFileBytes).toBeGreaterThan(0);
    }
  });
  it("recognizes supported languages", () => {
    expect(isLanguageCode("ur")).toBe(true);
    expect(isLanguageCode("xx")).toBe(false);
    expect(languageName("fr")).toBe("French");
    expect(languageName("xx")).toBe(undefined);
  });
});
