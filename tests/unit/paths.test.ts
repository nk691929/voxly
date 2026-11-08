import { describe, expect, it } from "vitest";
import { isAuthPath, isProtectedPath } from "../../src/lib/supabase/paths";

describe("route protection", () => {
  it("protects the workspace and history, including sub-pages", () => {
    expect(isProtectedPath("/workspace")).toBe(true);
    expect(isProtectedPath("/history")).toBe(true);
    expect(isProtectedPath("/history/123")).toBe(true);
  });
  it("does not protect public pages or look-alike paths", () => {
    expect(isProtectedPath("/")).toBe(false);
    expect(isProtectedPath("/pricing")).toBe(false);
    expect(isProtectedPath("/workspace-evil")).toBe(false);
  });
  it("recognizes sign-in pages", () => {
    expect(isAuthPath("/login")).toBe(true);
    expect(isAuthPath("/signup")).toBe(true);
    expect(isAuthPath("/loginx")).toBe(false);
  });
});
