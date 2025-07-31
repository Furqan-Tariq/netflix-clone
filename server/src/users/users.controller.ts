import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
    password: string;
  };
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.id);
  }

  @Put('update')
  async updateProfile(@Req() req: AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
