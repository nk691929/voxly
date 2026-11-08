import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Automatic accessibility check (axe). It finds many, not all, problems. It does not replace a manual check.
// Motion is reduced so the entrance animation cannot confuse the colour-contrast check.
const pages = ["/", "/voice-to-email", "/login", "/privacy"];

for (const scheme of ["light", "dark"] as const) {
  test.describe(`accessibility (${scheme} mode)`, () => {
    test.use({ colorScheme: scheme, reducedMotion: "reduce" });
    test.beforeEach(({ isMobile }) => {
      test.skip(isMobile, "Desktop only");
    });

    for (const path of pages) {
      test(`${path} has no detectable accessibility violations`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
      });
    }
  });
}
