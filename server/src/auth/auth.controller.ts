import { Controller, Post, Get, UseGuards, Req, Body } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import type { ChangePasswordDto } from './dto/change-password.dto';
import type { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request.interface'; // adjust path

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('REGISTER DTO:', registerDto); // Add this
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: AuthenticatedRequest) {
    if (!req.user) {
      throw new Error('User not found in request');
    }
    return {
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
      },
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Body() dto: ChangePasswordDto, @Req() req: AuthenticatedRequest) {
    if (!req.user?.id) {
      throw new Error("User not found in request")
    }
    return this.authService.changePassword(req.user.id, dto)
  }

  @Post("forgot-password")
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post("reset-password")
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto)
  }
}
