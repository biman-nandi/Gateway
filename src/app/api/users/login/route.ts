import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.models";
import bcrypt from 'bcrypt'
import connectDb from "@/dbConfig/db";
import jwt from "jsonwebtoken"

await connectDb()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (
      [email, password].some(field => field?.trim() === "")
    ) {
      return NextResponse.json({ error: "Email & Password is required" }, { status: 400 })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User not found!!" }, { status: 404 })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Incorrect password!!" }, { status: 400 })
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: '1d'
      }
    )

    const response = NextResponse.json({ message: "User created successfully", success: true })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24
    })

    return response
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}