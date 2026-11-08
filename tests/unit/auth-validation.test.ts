import { describe, expect, it } from "vitest";
import { validateCredentials } from "../../src/lib/validation/auth";

describe("validateCredentials", () => {
  it("accepts a normal email and password", () => {
    expect(validateCredentials("a@b.com", "password123")).toBe(null);
    expect(validateCredentials("  a@b.com ", "password123")).toBe(null);
  });
  it("rejects bad emails", () => {
    expect(validateCredentials("", "password123")).toBeTruthy();
    expect(validateCredentials("not-an-email", "password123")).toBeTruthy();
    expect(validateCredentials("a@b", "password123")).toBeTruthy();
    expect(validateCredentials("a b@c.com", "password123")).toBeTruthy();
  });
  it("rejects short and overlong passwords", () => {
    expect(validateCredentials("a@b.com", "short")).toBeTruthy();
    expect(validateCredentials("a@b.com", "x".repeat(73))).toBeTruthy();
    expect(validateCredentials("a@b.com", "x".repeat(72))).toBe(null);
  });
});
