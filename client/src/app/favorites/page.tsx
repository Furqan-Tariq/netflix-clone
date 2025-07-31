"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import MovieCard from "@/components/MovieCard"
import { favoritesAPI } from "@/services/api"
import type { Favorite } from "@/types"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetchFavorites()
  }, [router])

  const fetchFavorites = async () => {
    try {
      const response = await favoritesAPI.getAll()
      setFavorites(response.data)
    } catch (error) {
      console.error("Error fetching favorites:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFavoriteChange = () => {
    fetchFavorites()
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
          <h1 className="text-3xl font-bold text-white mb-8">My List</h1>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl mb-4">Your list is empty</p>
              <p className="text-gray-500">Add movies to your list to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favorites.map((favorite) => (
                <MovieCard
                  key={favorite.id}
                  movie={{
                    id: favorite.movieId,
                    title: favorite.title,
                    poster_path: favorite.poster || "",
                    overview: "",
                    backdrop_path: "",
                    release_date: "",
                    vote_average: 0,
                    genre_ids: [],
                  }}
                  isFavorite={true}
                  onFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
