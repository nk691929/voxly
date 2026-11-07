# Testing

## Commands (run from the project folder in PowerShell)

| Command | What it checks |
|---|---|
| `npm run lint` | Code style and common mistakes (ESLint) |
| `npm run typecheck` | Types are consistent (TypeScript) |
| `npm test` | Unit tests (Vitest) |
| `npm run build` | The production build succeeds |

All four must pass before merging a branch. CI (GitHub Actions) runs the same four on every pull request.

## What the unit tests cover now
- `tests/unit/plans.test.ts`: plan limits, remaining minutes, transcription checks, language list.

## Not tested yet
- Page rendering and accessibility (to be covered by Playwright end-to-end tests).
