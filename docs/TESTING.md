# Testing

## Commands (run from the project folder in PowerShell)

| Command | What it checks |
|---|---|
| `npm run lint` | Code style and common mistakes (ESLint) |
| `npm run typecheck` | Types are consistent (TypeScript) |
| `npm test` | Unit tests (Vitest) |
| `npm run build` | The production build succeeds |

All four must pass before merging a branch. CI runs the same four on every pull request.

## Unit tests
- `plans.test.ts`: plan limits, remaining minutes, transcription checks, languages
- `audio.test.ts`: file size, type, and magic-byte checks (a renamed .txt must be rejected)
- `rate-limit.test.ts`: limits, separate clients, window reset
- `prompts.test.ts`: instructions, and the prompt-injection defence for transcripts
- `parse.test.ts`: reading the AI response safely
- `generate-schema.test.ts`: request validation for `/api/generate`

## Not tested automatically yet
- The recorder UI and real microphone behaviour (manual checklist in README.txt)
- Real OpenAI calls (only the parsing and request-building logic is tested)
- End-to-end browser tests (Playwright) and accessibility checks
