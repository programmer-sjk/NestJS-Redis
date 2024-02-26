import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private redis: Redis) {}

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string) {
    return this.redis.set(key, value);
  }

  async zadd(key: string, score: number, member: string) {
    return this.redis.zadd(key, score, member);
  }

  async zrange(key: string, max: number) {
    return this.redis.zrange(key, 0, max);
  }

  async zrevrange(key: string, max: number) {
    return this.redis.zrevrange(key, 0, max);
  }
}
