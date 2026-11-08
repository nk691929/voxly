import { expect, test } from "@playwright/test";

// The form shows its own message in a <p role="alert">. (Next.js also has a hidden announcer with the same role.)
const formAlert = "p[role='alert']";

test.describe("sign-in and sign-up forms", () => {
  test("sign-in checks the email before sending anything", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Password").fill("whatever123");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.locator(formAlert)).toHaveText("Enter a valid email address.");
  });

  test("sign-up rejects a short password", async ({ page }) => {
    await page.goto("/signup");
    await page.getByLabel("Email").fill("someone@example.com");
    await page.getByLabel("Password").fill("short");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator(formAlert)).toHaveText("Password must be at least 8 characters.");
  });

  test("forgot-password checks the email", async ({ page }) => {
    await page.goto("/forgot-password");
    await page.getByLabel("Email").fill("nope");
    await page.getByRole("button", { name: "Send reset link" }).click();
    await expect(page.locator(formAlert)).toHaveText("Enter a valid email address.");
  });

  test("the forms link to each other", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Create an account" }).click();
    await expect(page).toHaveURL(/\/signup$/);
    await page.getByRole("link", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await page.getByRole("link", { name: "Forgot your password?" }).click();
    await expect(page).toHaveURL(/\/forgot-password$/);
  });
});
