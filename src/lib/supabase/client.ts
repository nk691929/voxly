import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

/** Supabase client for code that runs in the browser (client components). */
export function createClient() {
  const env = getSupabaseEnv();
  if (!env) throw new Error("Supabase is not configured. Check .env.local.");
  return createBrowserClient(env.url, env.key);
}
