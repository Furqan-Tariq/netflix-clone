"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { FiHeart, FiClock } from "react-icons/fi"
import type { Movie } from "@/types"
import { favoritesAPI, watchLaterAPI } from "@/services/api"

interface MovieCardProps {
  movie: Movie
  isFavorite?: boolean
  isWatchLater?: boolean
  onFavoriteChange?: () => void
  onWatchLaterChange?: () => void
}

export default function MovieCard({
  movie,
  isFavorite = false,
  isWatchLater = false,
  onFavoriteChange,
  onWatchLaterChange,
}: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite)
  const [watchLaterStatus, setWatchLaterStatus] = useState(isWatchLater)

  const imageUrl = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : "/placeholder.svg?height=400&width=300"

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login to add favorites")
      return
    }

    setIsLoading(true)
    try {
      if (favoriteStatus) {
        await favoritesAPI.remove(movie.id)
        setFavoriteStatus(false)
      } else {
        await favoritesAPI.add({
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
        })
        setFavoriteStatus(true)
      }
      onFavoriteChange?.()
    } catch (error) {
      console.error("Error updating favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWatchLaterClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login to add to watch later")
      return
    }

    setIsLoading(true)
    try {
      if (watchLaterStatus) {
        await watchLaterAPI.remove(movie.id)
        setWatchLaterStatus(false)
      } else {
        await watchLaterAPI.add({
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
        })
        setWatchLaterStatus(true)
      }
      onWatchLaterChange?.()
    } catch (error) {
      console.error("Error updating watch later:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="aspect-[2/3] relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            {/* <button className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
              <FiPlay className="w-5 h-5" />
            </button> */}
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                favoriteStatus ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <FiHeart className={`w-5 h-5 ${favoriteStatus ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleWatchLaterClick}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                watchLaterStatus
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <FiClock className={`w-5 h-5 ${watchLaterStatus ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{movie.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <div className="flex items-center space-x-1">
            <span>⭐</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
