# Changing a password (signed-in users)

Settings > Change password asks for the current password, then the new one twice.

## How it works
1. `/api/account/password` checks the session, then limits attempts (5 per minute per user).
2. It verifies the current password with a throwaway Supabase client that keeps no session.
3. Only if that succeeds does it set the new password with the admin client (server only).

## Forgot-password flow
Unchanged: the emailed link signs the user in briefly and `/update-password` sets a new password without asking for the old one (the user does not know it).

## Known limitations
- A person who already holds a signed-in browser session can still call Supabase directly from that browser and change the password without knowing the old one. Turn on "Secure password change" in Supabase (Authentication settings) to reduce that risk.
- Other signed-in devices stay signed in after a change.
- The attempt limiter is per server instance.
