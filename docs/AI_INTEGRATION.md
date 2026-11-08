# AI integration (MVP 2)

## Flow
Browser -> `/api/transcribe` (audio) -> OpenAI speech-to-text -> text back to the browser.
Browser -> `/api/generate` (transcript + output type) -> OpenAI Responses API -> text back.

## Files
- `src/lib/ai/openai.ts`: the only code that calls OpenAI. Reads `OPENAI_API_KEY` on the server.
- `src/lib/ai/prompts.ts`: builds instructions; wraps the transcript in `<transcript>` tags and strips any such tags from the speaker's text (prompt-injection defence).
- `src/lib/ai/parse.ts`: safely extracts text from the API response.
- `src/lib/ai/mock.ts`: demo output used when no API key is set.
- `src/lib/validation/audio.ts`: size, MIME type and magic-byte checks.
- `src/lib/validation/generate.ts`: Zod schema for `/api/generate`.
- `src/lib/security/rate-limit.ts`: in-memory limiter (6 transcriptions and 20 generations per minute per IP).

## Privacy
- Audio is held in memory for the request and is not written to disk or a database.
- Requests to the Responses API send `store: false`.
- Errors from the provider are not logged or sent to the browser.

## Known limitations
- No accounts yet: every request is treated as the Free plan, and usage minutes are not tracked.
- The rate limiter is per server instance. Replace with a shared store before public launch.
- Do NOT deploy publicly with a real API key until accounts and server-side usage limits exist (next milestone).
- Output for tasks is a text checklist, not yet a validated structured-output schema.
- Model names are defaults; verify them against current OpenAI documentation.
