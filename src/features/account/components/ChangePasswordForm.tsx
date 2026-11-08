"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { validatePasswordChange } from "@/lib/validation/auth";

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDone(false);
    const problem = validatePasswordChange(current, next, confirm);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(data?.error ?? "Could not change the password.");
        return;
      }
      setCurrent("");
      setNext("");
      setConfirm("");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card grid max-w-md gap-4 p-6" noValidate>
      <h1 className="font-display text-3xl font-semibold">Change password</h1>
      <div>
        <label htmlFor="current" className="mb-1 block text-sm font-medium">Current password</label>
        <input id="current" type="password" autoComplete="current-password" className="field" value={current} onChange={(e) => setCurrent(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="next" className="mb-1 block text-sm font-medium">New password</label>
        <input id="next" type="password" autoComplete="new-password" className="field" value={next} onChange={(e) => setNext(e.target.value)} required />
        <p className="mt-1 text-xs text-muted">At least 8 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm" className="mb-1 block text-sm font-medium">Repeat the new password</label>
        <input id="confirm" type="password" autoComplete="new-password" className="field" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </div>
      <div aria-live="polite">
        {error && <p role="alert" className="text-sm text-accent">{error}</p>}
        {done && <p role="status" className="text-sm">Your password has been changed.</p>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Change password
      </button>
    </form>
  );
}
