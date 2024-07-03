import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventsService {
  constructor(private eventEmitter: EventEmitter2) {}

  emitFileChangeEvent(data: any) {
    this.eventEmitter.emit('file.change', data);
  }
}
