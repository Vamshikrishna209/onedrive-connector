import { Controller, HttpCode, HttpStatus, Post, Req, Query, Body, HttpException } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import axios from 'axios';

@Controller('realtime')
export class RealTimeController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('subscribe')
  @HttpCode(200)
  async subscribe() {
    const accessToken = process.env.ACCESS_TOKEN;
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
      return response.data;
    } catch (error) {
      console.error('Error creating subscription:', error.response?.data || error.message);
      throw new Error('Subscription creation failed');
    }
  }

  @Post('notification')
  @HttpCode(200)
  async handleNotification(@Req() req,  @Query('validationToken') validationToken: string) {
    const notification = req.body;
    console.log("notification " + JSON.stringify(notification)); 
    this.eventsService.emitFileChangeEvent(notification);
    return validationToken;
  }
}
