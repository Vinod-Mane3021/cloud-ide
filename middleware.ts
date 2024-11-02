import { auth as middleware } from "@/auth";
import {
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiHttpPrefix,
} from "@/routes";
import { NextResponse } from "next/server";

export default middleware((request) => {
  const isLoggedIn = !!request.auth?.user;
  const pathname = request.nextUrl.pathname;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isHttpApiPrefix = pathname.includes(apiHttpPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // console.log({pathname, isHttpApiPrefix, isLoggedIn})

  if(pathname.includes("/api/auth/error")) {
    console.log("----------------------pathname ", pathname)
    return NextResponse.redirect(new URL("/vinod", request.nextUrl));
  }

  if (isApiAuthRoute) {
    return;
  }

  if (isHttpApiPrefix) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl));
  }

  if (!isLoggedIn && isAuthRoute) {
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
