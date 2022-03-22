import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as cookieParser from 'cookie-parser';
import { Cache } from 'cache-manager';
import { UserResponse } from '../../dto/UserResponse';
import { SessionResponse } from '../../dto/SessionResponse';

type sessionType = {
  user_id: number
}

@Injectable()
export class SessionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findUser(connectSid: string): Promise<UserResponse> {
    const session = await this.findRedisSession(connectSid);

    if (session && session.user_id) {
      const users = await this.manager.query(`
        SELECT 
          id as "accountId", 
          name, 
          realname as "realName", 
          email, 
          allowed_marketing as "allowedMarketing", 
          mobile, 
          country_code as "countryCode"  
        FROM users 
        WHERE id = ${session.user_id}
      `);

      if(users.length) {
        const user = users[0];
        return new UserResponse(
          user.accountId,
          user.name,
          user.realName,
          user.email,
          user.allowedMarketing,
          user.mobile,
          user.countryCode
        );
      }
    }
  }

  async findSession(connectSid: string): Promise<SessionResponse> {
    const session = await this.findRedisSession(connectSid);
    if (session && session.user_id) {
      return new SessionResponse(session.user_id);
    }
  }

  private async findRedisSession(connectSid: string): Promise<sessionType> {
    const sid = this.transformRedisKey(connectSid);
    return await this.findRedisValue(sid);
  }

  private async findRedisValue(key: string): Promise<sessionType> {
    return await this.cacheManager.get(key);
  }

  private transformRedisKey(connectSid: string): string {
    const signedCookie = cookieParser.signedCookie(connectSid, 'sc');

    if (!signedCookie) {
      throw new Error(`정합성 불일치, connectSid=${connectSid}`)
    }

    return `sess:${signedCookie}`;
  }
}