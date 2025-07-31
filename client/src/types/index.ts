export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Favorite {
  id: string
  movieId: number
  title: string
  poster?: string
}

export interface WatchLater {
  id: string
  movieId: number
  title: string
  poster?: string
}
