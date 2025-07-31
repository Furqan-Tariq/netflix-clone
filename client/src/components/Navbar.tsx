"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiSearch, FiUser, FiLogOut, FiHeart, FiClock } from "react-icons/fi"
import { authAPI } from "@/services/api"
import type { User } from "@/types"

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUser()
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await authAPI.getProfile()
      setUser(response.data.user)
    } catch (error) {
      localStorage.removeItem("token")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  return (
    <nav className="bg-black text-white px-4 py-3 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-red-600 text-2xl font-bold">
          NETFLIX
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {/* <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link> */}
          {user && (
            <>
              {/* <Link href="/favorites" className="hover:text-gray-300 transition-colors">
                My List
              </Link> */}
              {/* <Link href="/watch-later" className="hover:text-gray-300 transition-colors">
                Watch Later
              </Link> */}
              {/* <Link href="/profile" className="hover:text-gray-300 transition-colors">
                Profile
              </Link> */}
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <FiSearch className="w-5 h-5 cursor-pointer hover:text-gray-300" />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FiUser className="w-5 h-5" />
                <span className="hidden md:block">{user.name}</span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiHeart className="w-4 h-4 mr-2" />
                    Favorites
                  </Link>
                  <Link
                    href="/watch-later"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiClock className="w-4 h-4 mr-2" />
                    Watch Later
                  </Link>
                  <Link
                    href="/change-password"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="w-4 h-4 mr-2" />
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    <FiLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="px-4 py-2 text-sm hover:text-gray-300 transition-colors">
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
