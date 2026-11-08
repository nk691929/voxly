# Authentication (MVP 3)

## How it works
- Sign-up and sign-in use Supabase Auth (email + password). The session is stored in secure cookies.
- `src/proxy.ts` runs before `/workspace`, `/history`, `/login`, `/signup` and `/api/*`. It refreshes the session cookie and redirects signed-out visitors to `/login`.
- The proxy is a convenience, not the security. Every API route calls `requireUser()` (`src/lib/supabase/auth.ts`), which asks Supabase who the user is. No user, no service.
- Data safety comes from Row Level Security in the database (see `supabase/migrations/0001_generations.sql`).

## Files
- `src/lib/supabase/client.ts` (browser), `server.ts` (server), `proxy.ts` (session refresh), `auth.ts` (`requireUser`), `paths.ts` (which pages are protected), `env.ts`.
- `src/features/authentication/components/AuthForm.tsx`, `SignOutButton.tsx`.
- `src/app/auth/callback/route.ts`: finishes the email-confirmation link.

## Known limitations
- No password reset page yet.
- No account deletion yet (needs a server-only admin key; planned).
- Usage limits and billing are not enforced yet. Anyone who signs up can use your AI keys within the per-minute rate limits. Do not publish the site publicly until the next milestone.
- The rate limiter is still per server instance.
