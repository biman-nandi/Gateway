import connectDb from "@/dbConfig/db";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    await connectDb()

    const { token, password, confirmPassword } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Password reset token is required" },
        { status: 400 }
      );
    }

    if (!password || !confirmPassword || typeof password !== "string" || typeof confirmPassword !== "string" || password.length < 6 || confirmPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must contain at least 6 characters" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");


    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    const newPassword = await bcrypt.hash(password, 10)

    user.password = newPassword
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save({ validateBeforeSave: false })

    return NextResponse.json({ message: "Your password changed successfully", success: true }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}