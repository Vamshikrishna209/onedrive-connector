import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RealTimeService } from '../real-time/real-time.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly realtime: RealTimeService
  ) {}

  @Get('login')
  async login() {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=files.readwrite.all user.read`;
    console.log(authUrl);
    return { url: authUrl };
  }

  @Get('callback')
  async callback(@Query('code') code: string) {
    const accessToken = await this.authService.getAccessToken(code);
    this.realtime.subscribe(accessToken);
    return { accessToken };
  }
}