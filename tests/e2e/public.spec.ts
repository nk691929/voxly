import { expect, test } from "@playwright/test";

const landingPages = [
  { path: "/voice-to-email", h1: "Turn your voice into a clear email" },
  { path: "/voice-to-notes", h1: "Turn spoken thoughts into organized notes" },
  { path: "/voice-to-task-list", h1: "Turn what you said into a task list" },
];

test.describe("public pages", () => {
  test("home page loads with the main headline", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Voxly/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Speak naturally. Get things done.");
  });

  for (const { path, h1 } of landingPages) {
    test(`${path} loads with its own headline and canonical link`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
    });
  }

  test("privacy and terms pages carry the draft notice", async ({ page }) => {
    for (const [path, heading] of [
      ["/privacy", "Privacy notice"],
      ["/terms", "Terms of use"],
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      await expect(page.getByRole("note")).toContainText("Draft");
    }
  });

  test("footer links to the use-case pages", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    for (const { h1 } of landingPages) {
      await expect(footer.getByRole("link", { name: h1 })).toBeVisible();
    }
  });
});
