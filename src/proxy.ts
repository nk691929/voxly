import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

// Only the pages and routes that care about login. The public marketing pages are untouched.
export const config = {
  matcher: ["/workspace/:path*", "/history/:path*", "/login", "/signup", "/api/:path*"],
};
