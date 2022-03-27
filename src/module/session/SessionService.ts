import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { SessionResponse } from './dto/SessionResponse';
import { RedisService } from '../redis/RedisService';

@Injectable()
export class SessionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private redisService: RedisService,
  ) {}

  async findSession(connectSid: string): Promise<SessionResponse> {
    const session = await this.redisService.findRedisSession(connectSid);
    if (session && session.user_id) {
      return new SessionResponse(session.user_id);
    }
  }
}
