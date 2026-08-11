import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./app/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if ((user && pathname === "/login") || pathname === "/register") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return supabaseResponse;
}
export const config = {
  matcher: ["/dashboard/:path", "/login", "/register"],
};
