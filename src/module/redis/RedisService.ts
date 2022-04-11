import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as cookieParser from 'cookie-parser';
import { Cache } from 'cache-manager';

type sessionType = {
  user_id: number
}

@Injectable()
export class RedisService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  public async findRedisSession(connectSid: string): Promise<sessionType> {
    const sid = this.transformRedisKey(connectSid);
    return await this.findRedisValue(sid);
  }

  public async deleteRedisSession(connectSid: string): Promise<void> {
    const sid = this.transformRedisKey(connectSid);
    await this.deleteRedisValue(sid);
  }

  private async findRedisValue(key: string): Promise<sessionType> {
    return await this.cacheManager.get(key);
  }

  private async deleteRedisValue(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  private transformRedisKey(connectSid: string): string {
    const signedCookie = cookieParser.signedCookie(connectSid, 'sc');

    if (!signedCookie) {
      throw new Error(`정합성 불일치, connectSid=${connectSid}`)
    }

    return `sess:${signedCookie}`;
  }
}
