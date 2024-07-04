import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { OneDriveService } from './onedrive/onedrive.service';
import { OneDriveController } from './onedrive/onedrive.controller';
import { RealTimeController } from './real-time/real-time.controller';
import { AccessTokenMiddleware } from './middlewares/access-token-middleware';
import { EventsModule } from './events/events.module';
import { EventsService } from './events/events.service';
import { EventsController } from './events/events.controller';


@Module({
  imports: [AppConfigModule, EventsModule],
  controllers: [AppController,
    AuthController,
    OneDriveController,
    RealTimeController,
    EventsController
  ],
  providers: [AppService,
    AuthService,
    OneDriveService,
    EventsService
    ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes(
        { path: 'onedrive/list-files', method: RequestMethod.GET },
        { path: 'onedrive/download-file', method: RequestMethod.GET },
        { path: 'onedrive/list-users', method: RequestMethod.GET },
        { path: 'onedrive/delta', method: RequestMethod.GET },
      ); 
  }
}
