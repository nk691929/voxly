"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { validatePassword } from "@/lib/validation/auth";

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const problem = validatePassword(password);
    if (problem) {
      setError(problem);
      return;
    }
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await createClient().auth.updateUser({ password });
      if (err) {
        setError("Could not update the password. The link may have expired. Request a new one.");
        return;
      }
      setPassword("");
      setConfirm("");
      window.location.assign("/workspace");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto grid max-w-md gap-4 p-6" noValidate>
      <h1 className="font-display text-3xl font-semibold">Choose a new password</h1>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">New password</label>
        <input id="password" type="password" autoComplete="new-password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <p className="mt-1 text-xs text-muted">At least 8 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm" className="mb-1 block text-sm font-medium">Repeat the new password</label>
        <input id="confirm" type="password" autoComplete="new-password" className="field" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </div>
      <div aria-live="polite">{error && <p role="alert" className="text-sm text-accent">{error}</p>}</div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save new password
      </button>
    </form>
  );
}
