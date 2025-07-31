import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import type { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import type { ChangePasswordDto } from './dto/change-password.dto';
import type { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { ResetPasswordDto } from './dto/reset-password.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(registerDto: RegisterDto) {
    console.log('REGISTER DTO:', registerDto); // Add this

    const { email, password, name } = registerDto
    
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email)
    if (existingUser) {
      throw new ConflictException("User with this email already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    })

    // Generate JWT token
    const payload = { sub: user.id, email: user.email }
    const token = this.jwtService.sign(payload)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    // Find user by email
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email }
    const token = this.jwtService.sign(payload)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto

    // Find user with password
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect")
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    })

    return { message: "Password changed successfully" }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto

    // Find user by email
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      // Don't reveal if email exists or not for security
      return { message: "If the email exists, a reset link has been sent" }
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token
    await this.prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt,
      },
    })

    // In a real app, you would send an email here
    // For demo purposes, we'll just return the token
    console.log(`Password reset token for ${email}: ${resetToken}`)

    return {
      message: "If the email exists, a reset link has been sent",
      // Remove this in production - only for demo
      resetToken,
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto

    // Find valid reset token
    const resetTokenRecord = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetTokenRecord || resetTokenRecord.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid or expired reset token")
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user password
    await this.prisma.user.update({
      where: { id: resetTokenRecord.userId },
      data: { password: hashedPassword },
    })

    // Delete used reset token
    await this.prisma.passwordResetToken.delete({
      where: { id: resetTokenRecord.id },
    })

    return { message: "Password reset successfully" }
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId)
  }
}
