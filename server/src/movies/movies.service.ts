import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // ✅ Fixed here
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly tmdbApiKey: string;
  private readonly tmdbBaseUrl: string;

  constructor(private configService: ConfigService) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY') || '';
    this.tmdbBaseUrl = this.configService.get<string>('TMDB_BASE_URL') || '';
  }

  async getPopularMovies(page = 1) {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/movie/popular?api_key=${this.tmdbApiKey}&page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch popular movies');
    }
  }

  async getMovieDetails(movieId: number) {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/movie/${movieId}?api_key=${this.tmdbApiKey}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movie details');
    }
  }

  async searchMovies(query: string, page = 1) {
    try {
      const response = await axios.get(
        `${this.tmdbBaseUrl}/search/movie?api_key=${this.tmdbApiKey}&query=${encodeURIComponent(query)}&page=${page}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to search movies');
    }
  }

  async getTrendingMovies() {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/trending/movie/week?api_key=${this.tmdbApiKey}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch trending movies');
    }
  }
}
