"use server";

import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/constanst";

export async function POST() {
  try {
    return NextResponse.json(
      {
        message: "Token successfully deleted.",
        status: "success",
      },
      {
        headers: {
          "Set-Cookie": `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0;`,
        },
      }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { message: "Error during logout.", status: "error" },
      { status: 500 }
    );
  }
}

