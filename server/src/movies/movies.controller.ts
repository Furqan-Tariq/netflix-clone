import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('popular')
  async getPopularMovies(@Query('page') page: string = '1') {
    return this.moviesService.getPopularMovies(Number.parseInt(page));
  }

  @Get('trending')
  async getTrendingMovies() {
    return this.moviesService.getTrendingMovies()
  }

  @Get('search')
  async searchMovies(@Query('q') query: string, @Query('page') page: string = '1') {
    return this.moviesService.searchMovies(query, Number.parseInt(page))
  }

  @Get(':id')
  async getMovieDetails(@Param('id') id: string) {
    return this.moviesService.getMovieDetails(Number.parseInt(id));
  }
}
