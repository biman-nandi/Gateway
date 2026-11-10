import connectDb from "@/dbConfig/db";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    await connectDb()

    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");


    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationTokenExpiry = undefined

    await user.save({ validateBeforeSave: false })

    return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}