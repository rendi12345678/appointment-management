import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constanst";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";

const MAX_AGE = 60 * 60; // 1 hour in seconds

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({ message: "Username is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = await new SignJWT({
      _id: user._id,
      username: user.username,
      preferred_timezone: user.preferred_timezone
    })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(`${MAX_AGE}s`)
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    cookies().set({
      name: COOKIE_NAME,
      value: token,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
      maxAge: MAX_AGE,
      sameSite: "strict",
      expires: new Date(Date.now() + MAX_AGE),
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

