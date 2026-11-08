import { expect, test } from "@playwright/test";

test.describe("desktop interface", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(isMobile, "Desktop only");
  });
  test.use({ colorScheme: "light" });

  test("the skip link appears on the first Tab press", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });

  test("the dark mode button switches the theme", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("mobile interface", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!isMobile, "Mobile only");
  });

  test("the menu opens and shows the links", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Open menu").click();
    await expect(page.locator("details").getByRole("link", { name: "Pricing" })).toBeVisible();
  });
});
