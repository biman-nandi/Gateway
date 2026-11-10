import nodemailer from "nodemailer";
import { User } from "@/models/user.models";
import crypto from 'crypto'

type EmailType = "VERIFY" | "FORGOT";

export const sendEmail = async (email: string, emailType: EmailType, userId: string) => {

  try {
    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const expiry = Date.now() + 5 * 60 * 1000;

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(
        userId,
        {
          emailVerificationToken: hashedToken,
          emailVerificationTokenExpiry: expiry
        },
        {
          returnDocument: 'after'
        }
      )
    } else if (emailType === 'FORGOT') {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: expiry
        },
        {
          returnDocument: 'after'
        }
      )
    }


    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    })

    const mailresponse = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click
          <a href="${process.env.DOMAIN}/${emailType === 'VERIFY'? "verify-email": "reset-password"}?token=${token}">here</a>
          to ${emailType === "VERIFY"
          ? "verify your email"
          : "reset your password"
        }.
        </p>
      `
    });

    return mailresponse

  } catch (error: any) {
    throw new Error(error.message)
  }
}