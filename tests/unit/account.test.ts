import { describe, expect, it } from "vitest";
import { isDeleteConfirmed } from "../../src/lib/validation/account";
import { validateEmail, validatePassword } from "../../src/lib/validation/auth";

describe("isDeleteConfirmed", () => {
  it("accepts exactly DELETE (ignoring surrounding spaces)", () => {
    expect(isDeleteConfirmed("DELETE")).toBe(true);
    expect(isDeleteConfirmed("  DELETE ")).toBe(true);
  });
  it("rejects anything else", () => {
    expect(isDeleteConfirmed("delete")).toBe(false);
    expect(isDeleteConfirmed("DELETE ME")).toBe(false);
    expect(isDeleteConfirmed("")).toBe(false);
    expect(isDeleteConfirmed(undefined)).toBe(false);
    expect(isDeleteConfirmed(42)).toBe(false);
  });
});

describe("validateEmail / validatePassword", () => {
  it("checks emails", () => {
    expect(validateEmail("a@b.com")).toBe(null);
    expect(validateEmail("nope")).toBeTruthy();
  });
  it("checks passwords", () => {
    expect(validatePassword("longenough")).toBe(null);
    expect(validatePassword("short")).toBeTruthy();
    expect(validatePassword("x".repeat(73))).toBeTruthy();
  });
});
