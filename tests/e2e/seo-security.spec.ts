import { expect, test } from "@playwright/test";

test.describe("search engine files", () => {
  test("robots.txt hides private pages and points to the sitemap", async ({ request }) => {
    const text = await (await request.get("/robots.txt")).text();
    for (const path of ["/workspace", "/history", "/settings", "/api/"]) {
      expect(text).toContain(`Disallow: ${path}`);
    }
    expect(text).toContain("Sitemap:");
  });

  test("sitemap.xml lists the public pages", async ({ request }) => {
    const text = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/voice-to-email", "/voice-to-notes", "/voice-to-task-list", "/privacy", "/terms"]) {
      expect(text).toContain(path);
    }
    expect(text).not.toContain("/workspace");
  });

  test("home page has valid structured data", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw ?? "{}");
    const types = data["@graph"].map((item: { "@type": string }) => item["@type"]);
    expect(types).toEqual(["WebSite", "SoftwareApplication"]);
  });

  test("social image is generated", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("security headers", () => {
  for (const path of ["/", "/login"]) {
    test(`${path} sends the basic security headers`, async ({ request }) => {
      const headers = (await request.get(path)).headers();
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["x-frame-options"]).toBe("DENY");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["permissions-policy"]).toContain("microphone=(self)");
      expect(headers["x-powered-by"]).toBeUndefined();
    });
  }
});
