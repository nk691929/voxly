import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AccountEmail } from "@/features/account/components/AccountEmail";
import { DeleteAccount } from "@/features/account/components/DeleteAccount";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Settings</h1>
      <div className="mt-3 min-h-5">
        <Suspense fallback={null}>
          <AccountEmail />
        </Suspense>
      </div>
      <div className="mt-8 grid max-w-2xl gap-6">
        <section className="card p-6">
          <h2 className="text-lg font-semibold">Password</h2>
          <p className="mt-2 text-sm text-muted">Choose a new password for your account.</p>
          <Link href="/update-password" className="btn btn-ghost mt-4">Change password</Link>
        </section>
        <DeleteAccount />
        <p className="text-sm text-muted">
          Read how your data is handled in the <Link href="/privacy" className="font-semibold text-primary">privacy notice</Link>.
        </p>
      </div>
    </>
  );
}
