'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()


  return (
    <div className="flex justify-center items-center h-screen">
      <span>
        Go to Login page
      </span>

      <button 
        className="ml-2 underline text-blue-500 cursor-pointer"
        onClick={() => router.push('/login')}
      >
        Click here
        </button>
    </div>
  )
}
