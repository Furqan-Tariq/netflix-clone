"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { usersAPI } from "@/services/api"
import type { User } from "@/types"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetchProfile()
  }, [router])

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile()
      setUser(response.data)
      setFormData({
        name: response.data.name,
        avatar: response.data.avatar || "",
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setMessage("")

    try {
      const response = await usersAPI.update(formData)
      setUser(response.data)
      setMessage("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error) 
      //setMessage("Error updating profile")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          <div className="bg-gray-900 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <div
                  className={`p-3 rounded text-sm ${
                    message.includes("Error") ? "bg-red-600 text-white" : "bg-green-600 text-white"
                  }`}
                >
                  {message}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Avatar URL (optional)</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
