import { describe, expect, it } from "vitest";
import { isAuthPath, isProtectedPath } from "../../src/lib/supabase/paths";

describe("route protection", () => {
  it("protects the app pages, including sub-pages", () => {
    for (const p of ["/workspace", "/history", "/history/123", "/settings", "/update-password"]) {
      expect(isProtectedPath(p)).toBe(true);
    }
  });
  it("does not protect public pages or look-alike paths", () => {
    for (const p of ["/", "/pricing", "/privacy", "/terms", "/workspace-evil", "/settingsx"]) {
      expect(isProtectedPath(p)).toBe(false);
    }
  });
  it("recognizes the sign-in pages", () => {
    for (const p of ["/login", "/signup", "/forgot-password"]) expect(isAuthPath(p)).toBe(true);
    expect(isAuthPath("/loginx")).toBe(false);
    expect(isAuthPath("/update-password")).toBe(false);
  });
});
