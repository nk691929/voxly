"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { validateCredentials } from "@/lib/validation/auth";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const isLogin = mode === "login";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const problem = validateCredentials(email, password);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      if (isLogin) {
        const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (err) {
          setError("Incorrect email or password.");
          return;
        }
        router.replace("/workspace");
        router.refresh();
      } else {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (err) {
          setError(err.message);
          return;
        }
        if (data.session) {
          router.replace("/workspace");
          router.refresh();
        } else {
          setNotice("Check your email and click the confirmation link, then sign in.");
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 p-6" noValidate>
      <h1 className="font-display text-3xl font-semibold">{isLogin ? "Sign in" : "Create your account"}</h1>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
        <input id="email" type="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && <p className="mt-1 text-xs text-muted">At least 8 characters.</p>}
      </div>
      <div aria-live="polite">
        {error && <p role="alert" className="text-sm text-accent">{error}</p>}
        {notice && <p role="status" className="text-sm">{notice}</p>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isLogin ? "Sign in" : "Sign up"}
      </button>
      <p className="text-center text-sm text-muted">
        {isLogin ? "New to Voxly? " : "Already have an account? "}
        <Link href={isLogin ? "/signup" : "/login"} className="font-semibold text-primary">
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
