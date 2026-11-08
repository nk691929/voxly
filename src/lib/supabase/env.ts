/**
 * Reads the Supabase settings. The property names are written out in full on purpose:
 * Next.js only exposes NEXT_PUBLIC_ variables to the browser when it can see them spelled out.
 */
export function getSupabaseEnv(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}
