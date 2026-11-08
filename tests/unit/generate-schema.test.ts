import { describe, expect, it } from "vitest";
import { generateSchema } from "../../src/lib/validation/generate";

describe("generateSchema", () => {
  it("accepts a valid email request", () => {
    expect(generateSchema.safeParse({ transcript: "hello", outputType: "email", tone: "friendly" }).success).toBe(true);
  });
  it("rejects an empty transcript", () => {
    expect(generateSchema.safeParse({ transcript: "   ", outputType: "notes" }).success).toBe(false);
  });
  it("rejects an unknown output type", () => {
    expect(generateSchema.safeParse({ transcript: "hi", outputType: "poem" }).success).toBe(false);
  });
  it("rejects a transcript over 20,000 characters", () => {
    expect(generateSchema.safeParse({ transcript: "a".repeat(20001), outputType: "notes" }).success).toBe(false);
  });
  it("requires a supported target language for translation", () => {
    expect(generateSchema.safeParse({ transcript: "hi", outputType: "translate" }).success).toBe(false);
    expect(generateSchema.safeParse({ transcript: "hi", outputType: "translate", targetLanguage: "xx" }).success).toBe(false);
    expect(generateSchema.safeParse({ transcript: "hi", outputType: "translate", targetLanguage: "ur" }).success).toBe(true);
  });
});
