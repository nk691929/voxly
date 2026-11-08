import { expect, test } from "@playwright/test";

// These tests need the Supabase settings to exist (real or placeholder) when the app was built.
// They never talk to Supabase: a visitor with no session is turned away before any network call.

test.describe("signed-out visitors", () => {
  for (const path of ["/workspace", "/history", "/settings", "/change-password", "/update-password"]) {
    test(`${path} redirects to the sign-in page`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login$/);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sign in");
    });
  }

  test("API routes refuse signed-out requests", async ({ request }) => {
    const calls = [
      request.post("/api/generate", { data: { transcript: "hello", outputType: "email" } }),
      request.post("/api/transcribe", {
        multipart: { file: { name: "a.webm", mimeType: "audio/webm", buffer: Buffer.from("x") } },
      }),
      request.post("/api/account/delete", { data: { confirm: "DELETE" } }),
      request.post("/api/account/password", { data: { currentPassword: "a", newPassword: "bbbbbbbb" } }),
    ];
    for (const response of await Promise.all(calls)) {
      expect(response.status()).toBe(401);
      expect(response.headers()["cache-control"]).toContain("no-store");
      expect((await response.json()).error).toBe("Please sign in to continue.");
    }
  });

  test("API routes reject the wrong HTTP method", async ({ request }) => {
    const response = await request.get("/api/generate");
    expect(response.status()).toBe(405);
  });
});
