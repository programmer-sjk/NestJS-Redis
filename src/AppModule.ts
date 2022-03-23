import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger/src/LoggerModule';
import { HealthModule } from './module/health/HealthModule';
import { SessionModule } from './module/session/SessionModule';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        }
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: 'inf#$lab!%',
      database: process.env.DATABASE_NAME,
      entities: [],
    }),
    LoggerModule.register(),
    SessionModule,
    HealthModule
  ],
})
export class AppModule {}
