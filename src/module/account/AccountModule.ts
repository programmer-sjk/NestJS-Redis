import { Module } from '@nestjs/common';
import { AccountController } from './AccountController';
import { AccountService } from './AccountService';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
