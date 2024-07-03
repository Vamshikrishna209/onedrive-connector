import { Controller, Post, Req } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import axios from 'axios';

@Controller('realtime')
export class RealTimeController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('subscribe')
  async subscribe() {
    // Create a subscription to monitor file changes in OneDrive
    const response = await axios.post(
      'https://graph.microsoft.com/v1.0/subscriptions',
      {
        changeType: 'updated',
        notificationUrl: 'https://<your-server>/realtime/notification',
        resource: 'me/drive/root',
        expirationDateTime: new Date(Date.now() + 86400000).toISOString(),
        clientState: 'secretClientValue',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  @Post('notification')
  handleNotification(@Req() req: Request) {
    const notification = req.body;
    this.eventsService.emitFileChangeEvent(notification);
  }
}
