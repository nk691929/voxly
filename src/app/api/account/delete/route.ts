import { createRateLimiter } from "@/lib/security/rate-limit";
import { json } from "@/lib/security/request";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/auth";
import { isDeleteConfirmed } from "@/lib/validation/account";

const limiter = createRateLimiter({ limit: 3, windowMs: 60_000 });

/** Permanently deletes the signed-in user. Their saved results and usage rows go with them. */
export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  const rate = limiter.check(auth.userId);
  if (!rate.allowed) return json({ error: "Too many attempts. Please wait a moment." }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "The request body must be valid JSON." }, 400);
  }
  const confirm = (body as { confirm?: unknown } | null)?.confirm;
  if (!isDeleteConfirmed(confirm)) return json({ error: "Type DELETE to confirm." }, 400);

  const admin = createAdminClient();
  if (!admin) return json({ error: "Account deletion is not configured on the server." }, 503);

  // Only ever the caller's own ID, taken from the verified session, never from the request.
  const { error } = await admin.auth.admin.deleteUser(auth.userId);
  if (error) return json({ error: "Could not delete the account. Please try again." }, 502);
  return json({ ok: true });
}
