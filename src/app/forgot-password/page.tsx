'use client'

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)


  // Methods
  const handleLinkSend = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)

      await axios.post("/api/users/forgotPassword", { email })
      toast.success("If an account matches this email, a password reset link has been sent")

      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-[#ffff] p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-black text-center mb-2">
          Forgot Password?
        </h1>

        <p className="text-gray-500 text-center mb-8">
          No worries! Enter your registered email address, and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleLinkSend} className="space-y-5">

          <div>
            <label className="block text-gray-500 mb-2">
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-[#ffff] text-black border border-gray-600 outline-none focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:scale-105 hover:bg-blue-700 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {false ? "Sending Reset Link..." : "Send Reset Link"}
          </button>

          <p className="text-gray-500 text-sm text-center">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Back to Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}
