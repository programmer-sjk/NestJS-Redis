import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { AccountResponse } from './dto/AccountResponse';
import { RedisService } from '../redis/RedisService';


@Injectable()
export class AccountService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private redisService: RedisService,
  ) {}

  async findUser(connectSid: string): Promise<AccountResponse> {
    const session = await this.redisService.findRedisSession(connectSid);

    if (session && session.user_id) {
      const users = await this.manager.query(`
        SELECT 
          id as "accountId", 
          email, 
          allowed_marketing as "allowedMarketing", 
          mobile, 
          country_code as "countryCode"  
        FROM users 
        WHERE id = ${session.user_id}
      `);

      if(users.length) {
        const user = users[0];
        return new AccountResponse(
          user.accountId,
          user.email,
          user.allowedMarketing,
          user.mobile,
          user.countryCode
        );
      }
    }
  }
}
