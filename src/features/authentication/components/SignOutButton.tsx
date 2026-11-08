"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    try {
      await createClient().auth.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <button type="button" onClick={signOut} className="btn btn-ghost !px-4 !py-2 text-sm">
      <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
    </button>
  );
}
