import { connection } from "next/server";
import { PLANS } from "@/config/plans";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { countUsage } from "@/lib/usage/usage";

/** Shows this month's usage. Personal data, so it waits for a real request. */
export async function UsageSummary() {
  await connection();
  if (!getSupabaseEnv()) return null;
  const supabase = await createClient();
  const [transcriptions, generations] = await Promise.all([
    countUsage(supabase, "transcription"),
    countUsage(supabase, "generation"),
  ]);
  if (transcriptions === null || generations === null) return null;
  const plan = PLANS.free;
  return (
    <p role="status" className="text-sm text-muted">
      {plan.name} plan this month: {transcriptions} of {plan.monthlyTranscriptions} transcriptions and{" "}
      {generations} of {plan.monthlyGenerations} AI generations used.
    </p>
  );
}
