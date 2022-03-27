import { Module } from '@nestjs/common';
import { RedisService } from './RedisService';

@Module({
  providers: [RedisService],
})
export class RedisModule {}
