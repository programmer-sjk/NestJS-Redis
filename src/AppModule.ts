import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger/src/LoggerModule';
import { HealthModule } from './module/health/HealthModule';
import { SessionModule } from './module/user/SessionModule';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6381,
        }
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ant-man-rds-dev-cluster.cluster-cyhy1ftsjccr.ap-northeast-2.rds.amazonaws.com',
      port: 5432,
      username: 'inflab',
      password: 'inf#$lab!%',
      database: 'ant1',
      entities: [],
      synchronize: true,
    }),
    LoggerModule.register(),
    SessionModule,
    HealthModule
  ],
})
export class AppModule {}
