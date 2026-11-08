import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** The page the email confirmation link opens. It swaps the one-time code for a login session. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}/workspace`);
    } catch {
      // fall through to the login page
    }
  }
  return NextResponse.redirect(`${origin}/login`);
}
