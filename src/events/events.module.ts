import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
