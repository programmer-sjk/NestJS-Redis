import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { AccountResponse } from './dto/AccountResponse';
import { RedisService } from '../redis/RedisService';
import { WithdrawalResponse } from './dto/withdrawalResponse';


@Injectable()
export class AccountService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private redisService: RedisService,
  ) {}

  async findAccount(connectSid: string): Promise<AccountResponse> {
    const session = await this.redisService.findRedisSession(connectSid);

    if (session && session.user_id) {
      const accounts = await this.manager.query(`
        SELECT 
          id as "accountId", 
          email, 
          allowed_marketing as "allowedMarketing", 
          mobile, 
          country_code as "countryCode"  
        FROM users 
        WHERE id = ${session.user_id}
      `);

      if(accounts.length) {
        const account = accounts[0];
        return new AccountResponse(
          account.accountId,
          account.email,
          account.allowedMarketing,
          account.mobile,
          account.countryCode
        );
      }
    }
  }

  async findWithdrawalAccounts(): Promise<WithdrawalResponse[]> {
    const accounts = await this.manager.query(
      `SELECT "id" FROM "users" WHERE "deleted_at" > now() - interval '7' day`,
    );

    return accounts.map((account) => new WithdrawalResponse(account.id));
  }
}
