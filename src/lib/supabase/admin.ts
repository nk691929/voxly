import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

/**
 * Supabase client with full admin power. Server-only.
 * SUPABASE_SECRET_KEY must NEVER start with NEXT_PUBLIC_ and must never be imported by a client component.
 * Returns null when it is not configured.
 */
export function createAdminClient() {
  const env = getSupabaseEnv();
  const secret = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!env || !secret) return null;
  return createClient(env.url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
}
