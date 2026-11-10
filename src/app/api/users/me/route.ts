import connectDb from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

await connectDb()

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).select("-password -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry")

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }


    return NextResponse.json({ data: user, message: "User found" }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}