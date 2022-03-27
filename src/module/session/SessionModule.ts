import { Module } from '@nestjs/common';
import { SessionController } from './SessionController';
import { SessionService } from './SessionService';
import { RedisService } from '../redis/RedisService';

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    RedisService
  ],
})
export class SessionModule {}
