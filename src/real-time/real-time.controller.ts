import { Controller, HttpCode, HttpStatus, Post, Req, Query, Body, HttpException } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { RealTimeService } from './real-time.service';

@Controller('realtime')
export class RealTimeController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly realTimeService: RealTimeService,
  ) {}

  @Post('subscribe')
  @HttpCode(200)
  async subscribe(@Body('accessToken') accessToken: string) {
    return this.realTimeService.subscribe(accessToken);
  }

  @Post('notification')
  @HttpCode(200)
  async handleNotification(@Req() req, @Query('validationToken') validationToken: string) {
    const notification = this.realTimeService.handleNotification(req);
    console.log("Notification:", JSON.stringify(notification));
    if (typeof notification == 'object') {
      this.eventsService.emitFileChangeEvent(notification);
    }
    return validationToken;
  }
}
