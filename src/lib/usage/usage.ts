import type { SupabaseClient } from "@supabase/supabase-js";
import { monthStartUtc, type UsageKind } from "./quota";

/** How many of this kind the signed-in user has used this month. Null means we could not check. */
export async function countUsage(supabase: SupabaseClient, kind: UsageKind): Promise<number | null> {
  const { count, error } = await supabase
    .from("usage_events")
    .select("id", { count: "exact", head: true })
    .eq("kind", kind)
    .gte("created_at", monthStartUtc(new Date()));
  return error ? null : (count ?? 0);
}

/**
 * Records one use. The database function does the counting and the insert together,
 * so two requests at the same moment cannot both squeeze past the limit.
 */
export async function recordUsage(supabase: SupabaseClient, kind: UsageKind, limit: number): Promise<void> {
  await supabase.rpc("consume_usage", { p_kind: kind, p_limit: limit });
}
