import { Controller, Post, Req } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import axios from 'axios';

@Controller('realtime')
export class RealTimeController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('subscribe')
  async subscribe() {
    const accessToken = process.env.ACCESS_TOKEN;
    const subscriptionRequest = {
      changeType: 'updated',
      notificationUrl: 'https://onedrive-client.onrender.com/realtime/notification', // Replace with your public domain
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
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error creating subscription:', error.response?.data || error.message);
      throw new Error('Subscription creation failed');
    }
  }

  @Post('notification')
  async handleNotification(@Req() req) {
    const notification = req.body;
    return {
      "data" : {
        "message" : "success"
      },
    }
    this.eventsService.emitFileChangeEvent(notification);
  }
}
