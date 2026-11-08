"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isDeleteConfirmed } from "@/lib/validation/account";

export function DeleteAccount() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: text }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(data?.error ?? "Could not delete the account.");
        setBusy(false);
        return;
      }
      try {
        await createClient().auth.signOut();
      } catch {
        // The account is already gone; the page reload below clears the rest.
      }
      window.location.assign("/");
    } catch {
      setError("Could not delete the account. Please try again.");
      setBusy(false);
    }
  }

  return (
    <section className="card border-accent/40 p-6" aria-labelledby="delete-title">
      <h2 id="delete-title" className="text-lg font-semibold">Delete my account</h2>
      <p className="mt-2 text-sm text-muted">
        This permanently deletes your account, your saved results and your usage records. It cannot be undone.
      </p>
      <label htmlFor="confirm-delete" className="mt-4 block text-sm font-medium">
        Type <strong>DELETE</strong> to confirm
      </label>
      <input
        id="confirm-delete"
        className="field mt-1 max-w-xs"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="off"
      />
      <div aria-live="polite">{error && <p role="alert" className="mt-3 text-sm text-accent">{error}</p>}</div>
      <button type="button" className="btn btn-ghost mt-4" onClick={onDelete} disabled={busy || !isDeleteConfirmed(text)}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" aria-hidden="true" />}
        Delete my account
      </button>
    </section>
  );
}
