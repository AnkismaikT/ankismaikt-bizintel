import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes (no auth required)
  const publicRoutes = ["/login"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/analytics",
    "/users",
    "/org",
    "/settings",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const authCookie = request.cookies.get("auth_token");

    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analytics/:path*",
    "/users/:path*",
    "/org/:path*",
    "/settings/:path*",
  ],
};

