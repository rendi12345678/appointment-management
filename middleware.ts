import { NextRequest, NextResponse } from "next/server";
import { UserJwtPayload, verifyAuth } from "./lib/auth";
import { COOKIE_NAME } from "@/constanst";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  let verifiedToken: UserJwtPayload | null = null;

  try {
    verifiedToken = await verifyAuth(token as string);
  } catch (err) {
    console.error("Verification error:", err);
  }

  const { pathname, origin } = req.nextUrl;

  // If the user is authenticated and tries to access the login page, redirect to the home page (or any other page)
  if (verifiedToken && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", origin)); // Redirect to the homepage or dashboard
  }

  // If the user is not authenticated and tries to access any page other than login, redirect to the login page
  if (!verifiedToken && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  // If the user is authenticated, allow access to any route
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/create-appointment",
    "/appointments",
    "/",
  ],
};
