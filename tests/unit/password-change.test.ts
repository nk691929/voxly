import { describe, expect, it } from "vitest";
import { validatePasswordChange } from "../../src/lib/validation/auth";

describe("validatePasswordChange", () => {
  it("accepts a valid change", () => {
    expect(validatePasswordChange("oldpassword", "newpassword1", "newpassword1")).toBe(null);
  });
  it("requires the current password", () => {
    expect(validatePasswordChange("", "newpassword1", "newpassword1")).toBeTruthy();
  });
  it("rejects a weak or overlong new password", () => {
    expect(validatePasswordChange("oldpassword", "short", "short")).toBeTruthy();
    expect(validatePasswordChange("oldpassword", "x".repeat(73), "x".repeat(73))).toBeTruthy();
  });
  it("rejects a confirmation that does not match", () => {
    expect(validatePasswordChange("oldpassword", "newpassword1", "newpassword2")).toBeTruthy();
  });
  it("rejects reusing the current password", () => {
    expect(validatePasswordChange("samepassword", "samepassword", "samepassword")).toBeTruthy();
  });
});
