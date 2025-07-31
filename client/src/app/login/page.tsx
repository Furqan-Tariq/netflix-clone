"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authAPI } from "@/services/api"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await authAPI.login(formData)
      localStorage.setItem("token", response.data.token)
      router.push("/")
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            NETFLIX
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-600 text-white p-3 rounded text-sm">{error}</div>}

          <div className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-gray-400">
              <Link href="/forgot-password" className="text-white hover:underline">
                Forgot your password?
              </Link>
            </p>
            <p className="text-gray-400">
              New to Netflix?{" "}
              <Link href="/register" className="text-white hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
