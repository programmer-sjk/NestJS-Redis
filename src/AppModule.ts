import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './libs/logger/src/LoggerModule';
import { HealthModule } from './module/health/HealthModule';
import { SessionModule } from './module/session/SessionModule';
import * as redisStore from 'cache-manager-redis-store';
import { EnvUtil } from './libs/env-common/src/EnvUtil';
import { AccountModule } from './module/account/AccountModule';

const env = EnvUtil.getEnv();

@Module({
  imports: [
    EnvUtil.getConfigModule(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          store: redisStore,
          host: env.redis.host,
          port: env.redis.port,
        }
      },
    }),
    TypeOrmModule.forRoot({
      maxQueryExecutionTime: env.database.connectionTimeout,
      extra: {
        statement_timeout: env.database.connectionTimeout,
        min: env.database.minConnection,
        max: env.database.maxConnection,
      },
      type: 'postgres',
      host: env.database.readerHost,
      port: env.database.port,
      username: env.database.userName,
      password: env.database.password,
      database: env.database.name,
      entities: [],
    }),
    LoggerModule.register(),
    AccountModule,
    SessionModule,
    HealthModule
  ],
})
export class AppModule {}
