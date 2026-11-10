'use client'

import { useEffect, useState } from "react";
import LogoutButton from "../components/LogOut";
import axios from "axios";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";


interface profile {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
  isEmailVerified: boolean;
}


export default function ProfilePage() {
  const [profile, setProfile] = useState<profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/me')
        setProfile(response.data.data)
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
            {profile?.username?.toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold">
            {profile?.username}
              <MdVerified className={`${profile?.isEmailVerified ? "inline" : "hidden"}`} />
          </h1>

          <p className="text-gray-500 mt-1">
            {profile?.email}
          </p>

          <span className={`mt-3 px-4 py-1 ${profile?.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-full text-sm`}>
            {profile?.isActive ? "Active Account" : "Inactive Account"}
          </span>

        </div>

        <hr className="my-6" />

        <h2 className="text-lg font-semibold mb-4">
          Account Information
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{profile?.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">{profile?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-medium text-sm break-all">
              {profile?._id}
            </p>
          </div>

        </div>

        <div className="mt-8">
          <LogoutButton />
        </div>

      </div>
    </div>
  );

}