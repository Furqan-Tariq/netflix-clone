import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { AddWatchLaterDto } from './dto/add-watch-later.dto';

@Injectable()
export class WatchLaterService {
  constructor(private prisma: PrismaService) {}

  async addWatchLater(userId: string, addWatchLaterDto: AddWatchLaterDto) {
    const { movieId, title, poster } = addWatchLaterDto;

    // Check if already in watch later
    const existing = await this.prisma.watchLater.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Movie already in watch later list');
    }

    return this.prisma.watchLater.create({
      data: {
        userId,
        movieId,
        title,
        poster,
      },
    });
  }

  async removeWatchLater(userId: string, movieId: number) {
    const watchLater = await this.prisma.watchLater.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    if (!watchLater) {
      throw new NotFoundException("Movie not found in watch later list")
    }

    return this.prisma.watchLater.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })
  }

  async getWatchLater(userId: string) {
    return this.prisma.watchLater.findMany({
      where: { userId },
      orderBy: { id: "desc" },
    })
  }
}
