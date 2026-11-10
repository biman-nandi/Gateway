'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ResetPasswordPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  // Methods
  useEffect(() => {
    const tokenUrl = window.location.search.split('=')[1]
    setToken(tokenUrl || "")
  }, [])

  const handleResetPassword = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)

      await axios.post("/api/users/resetPassword", { token, password, confirmPassword })
      toast.success("Your password changed successfully")
      router.push('/login')

      setLoading(false)

    } catch (error: any) {
      toast.error(error.message)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-[#ffffff] p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-black text-center mb-2">
          Reset Password
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Create a new password for your account. Make sure it is secure
          and easy for you to remember.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={6}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:scale-105 hover:bg-blue-700 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>

        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
