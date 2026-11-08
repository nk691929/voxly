# Performance

Targets (not guarantees): Lighthouse Performance 95+, Accessibility 100, Best Practices 100, SEO 100; LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1.

## How to measure (always on a production build)
1. `npm run build`, then `npm run start`.
2. Open `http://localhost:3000` in a Chrome Incognito window (extensions off).
3. DevTools > Lighthouse > pick Mobile, then run. Repeat with Desktop.
4. Repeat for `/voice-to-email`.
Local numbers differ from a deployed site. Re-measure on the real deployment.

## Results
| Date | Page | Device | Perf | A11y | Best practices | SEO | Notes |
|---|---|---|---|---|---|---|---|
| not measured yet | | | | | | | |

## Known risks to check
- Two web fonts are bundled (Inter, Fraunces); check their weight in the Network tab.
- The home page ships client JavaScript only for the theme toggle.
- The workspace loads the recorder code only on that page.

## Measured on 8 November 2026 (local production build, reported by the owner)
| Page | Device | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| / | Mobile | 100 | 100 | 100 | 100 |
| / | Desktop | 100 | 100 | 100 | 100 |

Before the fix: mobile performance 81-82, accessibility 96 (low contrast on the call-to-action button in dark mode).
Changes: dark-mode button contrast, fonts loaded locally with preload.
Not yet measured: /voice-to-email, the deployed site, real devices. These local scores are not a guarantee for the live site.
