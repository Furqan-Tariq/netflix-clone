import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { AddFavoriteDto } from './dto/add-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: string, addFavoriteDto: AddFavoriteDto) {
    const { movieId, title, poster } = addFavoriteDto

    // Check if already in favorites
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    if (existing) {
      throw new ConflictException("Movie already in favorites")
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        movieId,
        title,
        poster,
      },
    })
  }

  async removeFavorite(userId: string, movieId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    if (!favorite) {
      throw new NotFoundException("Favorite not found")
    }

    return this.prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })
  }

  async getFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      orderBy: { id: "desc" },
    })
  }
}
