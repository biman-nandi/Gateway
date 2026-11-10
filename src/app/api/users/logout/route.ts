import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/dbConfig/db";

await connectDb()

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "User logged out successfully", success: true }, { status: 200 })

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0)
    })

    return response

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}