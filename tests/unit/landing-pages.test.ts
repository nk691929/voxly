import { describe, expect, it } from "vitest";
import { LANDING_PAGES, getLandingPage } from "../../src/config/landing-pages";

const SUFFIX = " | Voxly".length;
const HYPE = /\b(best|guarantee|guaranteed|100%|perfect|instant|unlimited|accurate|flawless)\b/i;

describe("landing pages", () => {
  it("has unique slugs", () => {
    const slugs = LANDING_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("keeps titles short enough for search results", () => {
    for (const p of LANDING_PAGES) expect(p.metaTitle.length + SUFFIX).toBeLessThan(61);
  });
  it("keeps descriptions a useful length", () => {
    for (const p of LANDING_PAGES) {
      expect(p.metaDescription.length).toBeGreaterThan(70);
      expect(p.metaDescription.length).toBeLessThan(161);
    }
  });
  it("is complete: three benefits, three steps, at least three FAQs, an example", () => {
    for (const p of LANDING_PAGES) {
      expect(p.benefits).toHaveLength(3);
      expect(p.steps).toHaveLength(3);
      expect(p.faqs.length).toBeGreaterThan(2);
      expect(p.exampleSaid.length).toBeGreaterThan(20);
      expect(p.exampleOutput.length).toBeGreaterThan(20);
    }
  });
  it("only links to pages that exist", () => {
    const slugs = LANDING_PAGES.map((p) => p.slug);
    for (const p of LANDING_PAGES) {
      for (const r of p.related) expect(slugs.includes(r)).toBe(true);
      expect(p.related.includes(p.slug)).toBe(false);
    }
  });
  it("avoids claims we cannot back up", () => {
    for (const p of LANDING_PAGES) {
      const text = [p.metaTitle, p.metaDescription, p.h1, p.intro, ...p.benefits.map((b) => b.text), ...p.faqs.map((f) => f.a)].join(" ");
      expect(HYPE.test(text)).toBe(false);
    }
  });
  it("finds pages by slug and throws on unknown ones", () => {
    expect(getLandingPage("voice-to-email").slug).toBe("voice-to-email");
    let threw = false;
    try {
      getLandingPage("nope");
    } catch {
      threw = true;
    }
    expect(threw).toBe(true);
  });
});
