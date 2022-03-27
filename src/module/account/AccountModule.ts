import { Module } from '@nestjs/common';
import { AccountController } from './AccountController';
import { AccountService } from './AccountService';
import { RedisService } from '../redis/RedisService';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    RedisService,
  ],
})
export class AccountModule {}
