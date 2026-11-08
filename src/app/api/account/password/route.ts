import { createRateLimiter } from "@/lib/security/rate-limit";
import { json } from "@/lib/security/request";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/auth";
import { verifyPassword } from "@/lib/supabase/verify-password";
import { validatePasswordChange } from "@/lib/validation/auth";

// Strict on purpose: this route checks a password, so guessing must be slow.
const limiter = createRateLimiter({ limit: 5, windowMs: 60_000 });

/** Changes the password only after the current password has been verified. */
export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  const rate = limiter.check(auth.userId);
  if (!rate.allowed) {
    return json({ error: "Too many attempts. Please wait a minute and try again." }, 429, {
      "Retry-After": String(rate.retryAfterSec),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "The request body must be valid JSON." }, 400);
  }
  const { currentPassword, newPassword } = (body ?? {}) as {
    currentPassword?: unknown;
    newPassword?: unknown;
  };
  if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
    return json({ error: "Both passwords are required." }, 400);
  }
  const problem = validatePasswordChange(currentPassword, newPassword, newPassword);
  if (problem) return json({ error: problem }, 400);
  if (!auth.email) return json({ error: "This account has no email address." }, 400);

  const correct = await verifyPassword(auth.email, currentPassword);
  if (!correct) return json({ error: "Your current password is incorrect." }, 400);

  const admin = createAdminClient();
  if (!admin) return json({ error: "Password changes are not configured on the server." }, 503);

  // Only ever the caller's own ID, taken from the verified session, never from the request.
  const { error } = await admin.auth.admin.updateUserById(auth.userId, { password: newPassword });
  if (error) return json({ error: "Could not change the password. Please try again." }, 502);
  return json({ ok: true });
}
