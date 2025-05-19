import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasCookie } from "cookies-next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isUserLoggedIn = await hasCookie("sid", { cookies });

  if (!isUserLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isUserLoggedIn && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login"],
};
