import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './controllers';
import { WSGateway } from './gateways';
import {
  ProxyService,
  TransactionService,
  VerseService,
  AllowCheckService,
  TypeCheckService,
  RateLimitService,
  WSClientManagerService,
} from './services';
import { DatastoreService } from './repositories';
import configuration from './config/configuration';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
    CacheModule.register(),
  ],
  controllers: [ProxyController],
  providers: [
    VerseService,
    TransactionService,
    ProxyService,
    AllowCheckService,
    TypeCheckService,
    DatastoreService,
    RateLimitService,
    WSGateway,
    WSClientManagerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
