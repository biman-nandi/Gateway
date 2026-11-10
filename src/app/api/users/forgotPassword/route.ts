import connectDb from "@/dbConfig/db";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mail";

export async function POST(request: NextRequest) {
  try {
    await connectDb()

    const { email } = await request.json();

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const user = await User.findOne({email})

    if (!user) {
      return NextResponse.json({ message: "If an account exists with this email, a password reset link will be sent.", success: true }, { status: 200 })
    }

    await sendEmail(email, "FORGOT", String(user._id))

    return NextResponse.json({ message: "If an account exists with this email, a password reset link will be sent.", success: true }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}