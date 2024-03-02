import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import Redlock from 'redlock';

@Injectable()
export class RedisService {
  private readonly redlock: Redlock;
  private readonly lockDuration = 10_000;

  constructor(@InjectRedis() private redis: Redis) {
    this.redlock = new Redlock([redis]);
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string) {
    return this.redis.set(key, value);
  }

  async setNx(key: string, value: string) {
    return this.redis.set(key, value, 'PX', 1000, 'NX');
  }

  async del(key: string) {
    return this.redis.del(key);
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

  async acquireLock(key: string) {
    return this.redlock.acquire([`lock:${key}`], this.lockDuration);
  }
}
