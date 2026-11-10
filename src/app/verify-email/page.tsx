'use client'

import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [token, setToken] = useState("")


  // Methods
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]

    setToken(urlToken || "")
  }, [])

  const handleVerifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token })
      toast.success("Email verified successfully")
      router.push('/login')

    } catch (error: any) {
      toast.error(error.response?.data?.error)
    }
  }


  return (
    <div className="flex justify-center items-center h-screen bg-[#121212]">
      <button
        onClick={handleVerifyEmail}
        className="p-2 bg-[#22BC66] cursor-pointer rounded-md duration-300 hover:scale-105"
      >
        Click here to verify your email
      </button>
    </div>
  )
}