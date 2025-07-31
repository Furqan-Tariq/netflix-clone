import axios from "axios"
import type { AuthResponse, User, MoviesResponse, Movie, Favorite, WatchLater } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

//const API_BASE_URL = ""
const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }): Promise<{ data: AuthResponse }> =>
    api.post("/auth/register", data),

  login: (data: { email: string; password: string }): Promise<{ data: AuthResponse }> => api.post("/auth/login", data),

  getProfile: (): Promise<{ data: { user: User } }> => api.get("/auth/me"),

  changePassword: (data: { currentPassword: string; newPassword: string }): Promise<{ data: { message: string } }> =>
    api.post("/auth/change-password", data),

  forgotPassword: (data: { email: string }): Promise<{ data: { message: string; resetToken?: string } }> =>
    api.post("/auth/forgot-password", data),

  resetPassword: (data: { token: string; newPassword: string }): Promise<{ data: { message: string } }> =>
    api.post("/auth/reset-password", data),
}

// Movies API
export const moviesAPI = {
  getPopular: (page = 1): Promise<{ data: MoviesResponse }> => api.get(`/movies/popular?page=${page}`),

  getTrending: (): Promise<{ data: MoviesResponse }> => api.get("/movies/trending"),

  search: (query: string, page = 1): Promise<{ data: MoviesResponse }> =>
    api.get(`/movies/search?q=${encodeURIComponent(query)}&page=${page}`),

  getDetails: (id: number): Promise<{ data: Movie }> => api.get(`/movies/${id}`),
}

// Favorites API
export const favoritesAPI = {
  add: (data: { movieId: number; title: string; poster?: string }): Promise<{ data: Favorite }> =>
    api.post("/favorites/add", data),

  remove: (movieId: number): Promise<void> => api.delete(`/favorites/remove/${movieId}`),

  getAll: (): Promise<{ data: Favorite[] }> => api.get("/favorites"),
}

// Watch Later API
export const watchLaterAPI = {
  add: (data: { movieId: number; title: string; poster?: string }): Promise<{ data: WatchLater }> =>
    api.post("/watch-later/add", data),

  remove: (movieId: number): Promise<void> => api.delete(`/watch-later/remove/${movieId}`),

  getAll: (): Promise<{ data: WatchLater[] }> => api.get("/watch-later"),
}

// Users API
export const usersAPI = {
  getProfile: (): Promise<{ data: User }> => api.get("/users/profile"),

  update: (data: { name?: string; avatar?: string }): Promise<{ data: User }> => api.put("/users/update", data),
}
