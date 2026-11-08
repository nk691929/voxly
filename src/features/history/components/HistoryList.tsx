import Link from "next/link";
import { connection } from "next/server";
import { PLANS } from "@/config/plans";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { HistoryRow } from "../types";
import { HistoryItem } from "./HistoryItem";

/** Runs on the server. Row Level Security means the database only returns this user's rows. */
export async function HistoryList() {
  // Wait for a real request first. This list is personal, so it must never be built ahead of time.
  await connection();
  if (!getSupabaseEnv()) {
    return <p role="alert" className="text-accent">Accounts are not configured on the server.</p>;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("generations")
    .select("id, output_type, source_text, output_text, created_at")
    .order("created_at", { ascending: false })
    .limit(PLANS.free.historyItems ?? 100);

  if (error) {
    return <p role="alert" className="text-accent">Could not load your history. Please refresh the page.</p>;
  }
  const rows = (data ?? []) as HistoryRow[];
  if (rows.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="font-semibold">Nothing saved yet</p>
        <p className="mt-1 text-sm text-muted">Results you generate are saved here automatically.</p>
        <Link href="/workspace" className="btn btn-primary mt-5">Go to the workspace</Link>
      </div>
    );
  }
  return (
    <ul className="grid gap-4">
      {rows.map((row) => (
        <HistoryItem key={row.id} item={row} />
      ))}
    </ul>
  );
}

