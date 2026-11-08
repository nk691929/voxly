import { describe, expect, it } from "vitest";
import { chooseTextProvider } from "../../src/lib/ai/provider-choice";

describe("chooseTextProvider", () => {
  it("uses demo mode with no keys", () => {
    expect(chooseTextProvider({})).toBe("mock");
    expect(chooseTextProvider({ DEEPSEEK_API_KEY: "  ", OPENAI_API_KEY: "" })).toBe("mock");
  });
  it("prefers DeepSeek when its key is set", () => {
    expect(chooseTextProvider({ DEEPSEEK_API_KEY: "a" })).toBe("deepseek");
    expect(chooseTextProvider({ DEEPSEEK_API_KEY: "a", OPENAI_API_KEY: "b" })).toBe("deepseek");
  });
  it("uses OpenAI when only its key is set", () => {
    expect(chooseTextProvider({ OPENAI_API_KEY: "b" })).toBe("openai");
  });
  it("lets AI_TEXT_PROVIDER override the automatic choice", () => {
    expect(chooseTextProvider({ AI_TEXT_PROVIDER: "openai", DEEPSEEK_API_KEY: "a", OPENAI_API_KEY: "b" })).toBe("openai");
    expect(chooseTextProvider({ AI_TEXT_PROVIDER: "DeepSeek", DEEPSEEK_API_KEY: "a", OPENAI_API_KEY: "b" })).toBe("deepseek");
  });
  it("falls back to demo mode if the forced provider has no key", () => {
    expect(chooseTextProvider({ AI_TEXT_PROVIDER: "openai", DEEPSEEK_API_KEY: "a" })).toBe("mock");
  });
});
