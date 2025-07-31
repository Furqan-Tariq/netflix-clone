import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import type { Request } from 'express';
import { WatchLaterService } from './watch-later.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AddWatchLaterDto } from './dto/add-watch-later.dto';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request.interface'; // adjust path

@Controller('watch-later')
@UseGuards(JwtAuthGuard)
export class WatchLaterController {
  constructor(private watchLaterService: WatchLaterService) {}

  @Post('add')
  async addWatchLater(@Body() addWatchLaterDto: AddWatchLaterDto, @Req() req: AuthenticatedRequest) {
    if (!req.user?.id) {
      // eslint-disable-next-line prettier/prettier
      throw new Error("User not found in request")
    }
    return this.watchLaterService.addWatchLater(req.user.id, addWatchLaterDto)
  }

  @Delete('remove/:movieId')
  async removeWatchLater(
    @Param('movieId') movieId: string,
    @Req() req: Request,
  ) {
    if (!req.user?.id) {
      throw new Error('User not found in request');
    }
    return this.watchLaterService.removeWatchLater(
      req.user.id,
      Number.parseInt(movieId),
    );
  }

  @Get()
  async getWatchLater(@Req() req: Request) {
    if (!req.user?.id) {
      throw new Error('User not found in request');
    }
    return this.watchLaterService.getWatchLater(req.user.id)
  }
}
