"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  async function signOut() {
    try {
      await createClient().auth.signOut();
    } finally {
      // A full page load wipes the transcript, results and form text left on screen.
      window.location.assign("/login");
    }
  }

  return (
    <button type="button" onClick={signOut} className="btn btn-ghost !px-4 !py-2 text-sm">
      <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
    </button>
  );
}
