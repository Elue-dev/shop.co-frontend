import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const access_token = request.cookies.get("access_token");

  const authPages = ["/auth/login", "/auth/register"];

  if (access_token && authPages.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!access_token && !authPages.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
