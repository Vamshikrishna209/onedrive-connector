import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Controller('events')
export class EventsController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return new Observable((observer) => {
      const handler = (data: any) => observer.next({ data });
      this.eventEmitter.on('file.change', handler);
      return () => this.eventEmitter.off('file.change', handler);
    });
  }
}
