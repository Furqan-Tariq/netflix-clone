import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AddFavoriteDto } from './dto/add-favorite.dto';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post('add')
  async addFavorite(@Body() addFavoriteDto: AddFavoriteDto,@Request() req) {
    return this.favoritesService.addFavorite(req.user.id, addFavoriteDto)
  }

  @Delete('remove/:movieId')
  async removeFavorite(@Param('movieId') movieId: string,@Request() req) {
    return this.favoritesService.removeFavorite(req.user.id, Number.parseInt(movieId))
  }

  @Get()
  async getFavorites(@Request() req) {
    return this.favoritesService.getFavorites(req.user.id)
  }
}
