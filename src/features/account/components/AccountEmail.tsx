import { connection } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/** Shows who is signed in. Personal data, so it waits for a real request. */
export async function AccountEmail() {
  await connection();
  if (!getSupabaseEnv()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.email) return null;
  return (
    <p className="text-sm text-muted">
      Signed in as <strong className="text-fg">{data.user.email}</strong>
    </p>
  );
}
