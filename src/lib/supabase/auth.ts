import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./server";

export type AuthResult =
  | { ok: true; supabase: SupabaseClient; userId: string }
  | { ok: false; status: number; error: string };

/**
 * Every API route calls this first. It asks Supabase's auth server who the user is
 * (it does not trust anything the browser claims).
 */
export async function requireUser(): Promise<AuthResult> {
  let supabase: SupabaseClient;
  try {
    supabase = await createClient();
  } catch {
    return { ok: false, status: 503, error: "Accounts are not configured on the server." };
  }
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { ok: false, status: 401, error: "Please sign in to continue." };
  return { ok: true, supabase, userId: data.user.id };
}
