import { Module } from '@nestjs/common';
import { SessionController } from './SessionController';
import { SessionService } from './SessionService';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
