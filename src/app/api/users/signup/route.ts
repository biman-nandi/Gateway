import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import connectDb from "@/dbConfig/db";
import { sendEmail } from "@/helpers/mail";

await connectDb()

export async function POST(request:NextRequest) {
  try {
    const {username, email, password} = await request.json()

    if (
      [username, email, password].some(field => field?.trim() === "")
    ) {
      return NextResponse.json({error: "All the fields are required"}, {status: 400})
    }

    const user = await User.findOne({
      $or: [{username}, {email}]
    })

    if (user) {
      return NextResponse.json({error: "User already exist!!"}, {status: 409})
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    })

    await sendEmail(email, 'VERIFY', newUser._id)

    return NextResponse.json({message: "User created successfully", success: true})
    
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}