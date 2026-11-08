"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { HistoryRow } from "../types";

const LABELS: Record<HistoryRow["output_type"], string> = {
  email: "Email",
  notes: "Notes",
  tasks: "Task list",
  translate: "Translation",
};

export function HistoryItem({ item }: { item: HistoryRow }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // Fixed format (UTC) so the server and browser always show the same text.
  const when = `${item.created_at.slice(0, 16).replace("T", " ")} UTC`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(item.output_text);
      setMessage("Copied.");
    } catch {
      setMessage("Could not copy. Select the text and copy it manually.");
    }
  }

  async function remove() {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    setBusy(true);
    setMessage(null);
    const { error } = await createClient().from("generations").delete().eq("id", item.id);
    setBusy(false);
    if (error) {
      setMessage("Could not delete. Please try again.");
      return;
    }
    router.refresh();
  }

  return (
    <li className="card p-5">
      <details>
        <summary className="cursor-pointer list-none">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{LABELS[item.output_type]}</span>
          <span className="ml-3 text-xs text-muted">{when}</span>
          <span className="mt-1 block truncate text-sm">{item.output_text.slice(0, 120)}</span>
        </summary>
        <pre className="mt-4 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">{item.output_text}</pre>
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-muted">Show the original transcript</summary>
          <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{item.source_text}</p>
        </details>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-ghost" onClick={copy}>
            <Copy className="h-4 w-4" aria-hidden="true" /> Copy
          </button>
          <button type="button" className="btn btn-ghost" onClick={remove} disabled={busy}>
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
          </button>
          {message && <span role="status" className="text-sm text-muted">{message}</span>}
        </div>
      </details>
    </li>
  );
}
