"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import MovieCard from "@/components/MovieCard"
import { moviesAPI } from "@/services/api"
import type { Movie } from "@/types"

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const [popularResponse, trendingResponse] = await Promise.all([moviesAPI.getPopular(), moviesAPI.getTrending()])

      setPopularMovies(popularResponse.data.results)
      setTrendingMovies(trendingResponse.data.results)
    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setIsLoading(false)
    }
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

      {/* Hero Section */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Unlimited movies, TV shows, and more</h1>
            <p className="text-xl text-gray-300 mb-8">Watch anywhere. Cancel anytime.</p>
          </div>
        </div>
      </div>

      {/* Trending Movies */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingMovies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Movies */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularMovies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
