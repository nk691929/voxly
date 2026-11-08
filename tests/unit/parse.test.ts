import { describe, expect, it } from "vitest";
import { extractResponseText } from "../../src/lib/ai/parse";

describe("extractResponseText", () => {
  it("reads text from a normal response", () => {
    const data = { output: [{ type: "message", content: [{ type: "output_text", text: "Hello " }, { type: "output_text", text: "world" }] }] };
    expect(extractResponseText(data)).toBe("Hello world");
  });
  it("ignores non-message items", () => {
    const data = { output: [{ type: "reasoning" }, { type: "message", content: [{ type: "output_text", text: "ok" }] }] };
    expect(extractResponseText(data)).toBe("ok");
  });
  it("returns an empty string for unexpected shapes", () => {
    expect(extractResponseText(null)).toBe("");
    expect(extractResponseText({})).toBe("");
    expect(extractResponseText({ output: "nope" })).toBe("");
    expect(extractResponseText({ output: [{ type: "message", content: [{ type: "output_text", text: 5 }] }] })).toBe("");
  });
});
