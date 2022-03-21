import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger/src/LoggerModule';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6381,
        }
      },
    }),
    CacheModule.register(),
    LoggerModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
