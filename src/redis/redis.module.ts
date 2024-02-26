import { Module } from '@nestjs/common';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    IORedisModule.forRoot({
      type: 'single',
      url: 'localhost',
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
