import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

/**
 * Checks an email + password pair with a throwaway client that keeps no session,
 * so it never touches the signed-in user's cookies.
 */
export async function verifyPassword(email: string, password: string): Promise<boolean> {
  const env = getSupabaseEnv();
  if (!env) return false;
  const client = createClient(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { error } = await client.auth.signInWithPassword({ email, password });
  return !error;
}
