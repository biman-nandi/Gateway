'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function SignupPage() {
  const router = useRouter()

  const [buttonEnabled, setButtonEnabled] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });


  // Methods
  useEffect(() => {
    if (user.username.length > 2 && user.email.length != 0 && user.password.length > 5) {
      setButtonEnabled(true)
    }

    else {
      setButtonEnabled(false)
    }
  }, [user])

  const handleSignUp = async () => {
    try {
      await axios.post("/api/users/signup", user)
      toast.success("User registered successfully")
      router.push('/login')

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        <div className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={user.username}
            onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={user.email}
            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={!buttonEnabled}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}