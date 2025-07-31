"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { authAPI } from "@/services/api"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [resetToken, setResetToken] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await authAPI.forgotPassword({ email })
      setMessage(response.data.message)
      // For demo purposes - in production, this would be sent via email
      if (response.data.resetToken) {
        setResetToken(response.data.resetToken)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to send reset email")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            NETFLIX
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Forgot Password</h2>
          <p className="mt-2 text-gray-400">Enter your email to reset your password</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {message && <div className="bg-blue-600 text-white p-3 rounded text-sm">{message}</div>}

          {resetToken && (
            <div className="bg-yellow-600 text-white p-3 rounded text-sm">
              <p className="font-semibold">Demo Reset Token:</p>
              <p className="break-all">{resetToken}</p>
              <p className="mt-2">
                <Link href={`/reset-password?token=${resetToken}`} className="underline">
                  Click here to reset your password
                </Link>
              </p>
            </div>
          )}

          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Remember your password?{" "}
              <Link href="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
