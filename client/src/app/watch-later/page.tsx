"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import MovieCard from "@/components/MovieCard"
import { watchLaterAPI } from "@/services/api"
import type { WatchLater } from "@/types"

export default function WatchLaterPage() {
  const [watchLater, setWatchLater] = useState<WatchLater[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetchWatchLater()
  }, [router])

  const fetchWatchLater = async () => {
    try {
      const response = await watchLaterAPI.getAll()
      setWatchLater(response.data)
    } catch (error) {
      console.error("Error fetching watch later:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWatchLaterChange = () => {
    fetchWatchLater()
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Watch Later</h1>

          {watchLater.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl mb-4">Your watch later list is empty</p>
              <p className="text-gray-500">Add movies to watch later to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {watchLater.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={{
                    id: item.movieId,
                    title: item.title,
                    poster_path: item.poster || "",
                    overview: "",
                    backdrop_path: "",
                    release_date: "",
                    vote_average: 0,
                    genre_ids: [],
                  }}
                  isWatchLater={true}
                  onWatchLaterChange={handleWatchLaterChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
