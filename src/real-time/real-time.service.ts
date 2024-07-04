import { Injectable, HttpException, HttpStatus, Req } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RealTimeService {
  async subscribe(accessToken: string) {
    const subscriptionRequest = {
      changeType: 'updated',
      notificationUrl: 'https://onedrive-connector.onrender.com/realtime/notification', // Replace with your public domain
      resource: 'me/drive/root',
      expirationDateTime: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      clientState: 'secretClientValue',
    };

    try {
      const response = await axios.post(
        'https://graph.microsoft.com/v1.0/subscriptions',
        subscriptionRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Prefer: 'includesecuritywebhooks'
          },
        },
      );
      console.log("Subscription successful");
      return response.data;
    } catch (error) {
      console.error('Error creating subscription:', error.response?.data || error.message);
      throw new HttpException('Subscription creation failed', HttpStatus.BAD_REQUEST);
    }
  }

  handleNotification(@Req() req) {
    return req.body;
  }
}
