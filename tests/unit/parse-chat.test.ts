import { describe, expect, it } from "vitest";
import { extractChatText } from "../../src/lib/ai/parse";

describe("extractChatText", () => {
  it("reads the answer from a chat completions response", () => {
    expect(extractChatText({ choices: [{ message: { role: "assistant", content: " Hello " } }] })).toBe("Hello");
  });
  it("returns an empty string for unexpected shapes", () => {
    expect(extractChatText(null)).toBe("");
    expect(extractChatText({})).toBe("");
    expect(extractChatText({ choices: [] })).toBe("");
    expect(extractChatText({ choices: [{ message: { content: 5 } }] })).toBe("");
    expect(extractChatText({ choices: ["x"] })).toBe("");
  });
});
