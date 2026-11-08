# Account features (MVP 5)

## Password reset
`/forgot-password` asks Supabase to email a link. The link opens `/auth/recovery`, which exchanges the one-time code for a short session and sends the user to `/update-password`. The form always shows the same message, so it cannot be used to discover which emails have accounts.

## Account deletion
Settings > Delete my account. The user must type DELETE. `/api/account/delete` verifies the session, then uses the admin client (`SUPABASE_SECRET_KEY`, server only) to delete only the caller's own user. Saved results and usage rows are removed automatically (`on delete cascade`).

## Legal pages
`/privacy` and `/terms` are drafts that describe actual behaviour. They carry a visible draft notice and need legal review and a contact method before launch.

## Known limitations
- Supabase's built-in email sender is heavily rate-limited; use a custom email provider before launch.
- No re-authentication step before deletion beyond the typed confirmation.
- Data export is not built yet.
