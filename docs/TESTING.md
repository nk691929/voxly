# Testing

## Commands (run from the project folder in PowerShell)

| Command | What it checks |
|---|---|
| `npm run lint` | Code style and common mistakes (ESLint) |
| `npm run typecheck` | Types are consistent (TypeScript) |
| `npm test` | Unit tests (Vitest), fast, no browser |
| `npm run build` | The production build succeeds |
| `npm run e2e` | Browser tests (Playwright) against the production build |
| `npm run e2e:report` | Opens the last browser-test report |

All must pass before merging. CI runs lint, typecheck, unit tests and build (`ci.yml`) and the browser tests (`e2e.yml`) on every pull request.

## Unit tests (`tests/unit`)
Plan limits, quotas, file validation, rate limiting, prompt safety, password and email rules, route protection, landing page content.

## Browser tests (`tests/e2e`)
- `public.spec.ts`: public pages, headlines, canonical links, draft notices, footer links
- `access.spec.ts`: signed-out visitors are redirected; every API route answers 401 without a session
- `auth-forms.spec.ts`: form validation messages and links
- `seo-security.spec.ts`: robots.txt, sitemap, structured data, social image, security headers
- `ui.spec.ts`: skip link, dark-mode button, mobile menu
- `accessibility.spec.ts`: automatic axe check in light and dark mode

They run on desktop and on a phone-sized browser. Before running them locally, close any `npm run dev` or `npm run start` window.

## Not tested automatically yet
- Real sign-up, sign-in, history, deletion and password change (they need a test Supabase project)
- Real microphone recording and real AI calls (paid APIs are never called in tests)
- Payments (not built)
