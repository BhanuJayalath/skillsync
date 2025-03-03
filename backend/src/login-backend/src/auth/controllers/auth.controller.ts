import { Controller, Post, Body, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { FacebookAuthGuard } from '../guards/facebook-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ Register Route
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  // ✅ Login Route
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  // ✅ Google OAuth
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    res.json({ message: 'Google Login Successful', user: req.user });
  }

  // ✅ Facebook OAuth
  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  facebookLoginCallback(@Req() req: Request, @Res() res: Response) {
    res.json({ message: 'Facebook Login Successful', user: req.user });
  }

  @Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Req() req) {
  return req.user;
}

}
