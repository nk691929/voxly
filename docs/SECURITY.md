# Security (current state)

## In place
- Every API route verifies the session on the server (`requireUser`) and answers 401 otherwise.
- Row Level Security on `generations` and `usage_events`; usage can only be written by a database function.
- Monthly limits and per-minute rate limits enforced on the server.
- File checks: size, type and real audio content (magic bytes).
- Prompt-injection defence for transcripts.
- Secrets only on the server; `.env.local` is never committed.
- Account deletion and password change are server-verified; password change needs the current password.
- Security headers (`next.config.ts`): nosniff, frame denial, referrer policy, permissions policy (microphone only for our own pages), no X-Powered-By.

## Not done yet
- Content-Security-Policy (needs careful testing with Next.js scripts and Supabase).
- Shared rate limiting (the current limiter is per server instance).
- Error monitoring, dependency audit review (`npm audit` reported moderate issues), data export.
- Legal review of the privacy and terms drafts.
