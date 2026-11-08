"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { validateEmail } from "@/lib/validation/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const problem = validateEmail(email);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    try {
      await createClient().auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/recovery`,
      });
      // Same message whether or not the account exists, so nobody can use this form to find out who has one.
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 p-6" noValidate>
      <h1 className="font-display text-3xl font-semibold">Reset your password</h1>
      <p className="text-sm text-muted">Enter your email and we will send you a link to choose a new password.</p>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
        <input id="email" type="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div aria-live="polite">
        {error && <p role="alert" className="text-sm text-accent">{error}</p>}
        {sent && <p role="status" className="text-sm">If an account exists for that email, a reset link is on its way. Check your inbox and spam folder.</p>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Send reset link
      </button>
      <p className="text-center text-sm text-muted">
        <Link href="/login" className="font-semibold text-primary">Back to sign in</Link>
      </p>
    </form>
  );
}
