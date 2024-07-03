import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'querystring';

@Injectable()
export class AuthService {
  async getAccessToken(authCode: string): Promise<string> {
    const tokenUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

    try {
      const response = await axios.post(tokenUrl, qs.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
  
      return response.data.access_token;
    } catch(error) {
      console.log(error);
    }
  }
}