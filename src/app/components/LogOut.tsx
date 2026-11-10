'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setLoading(true)

      await axios.get("/api/users/logout")
      toast.success(" have been safely signed out. Log in again")
      router.push('/login')

    } catch (error: any) {
      toast.error(error.message)
      
    } finally {
      setLoading(false)
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50  disabled:cursor-not-allowed"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}