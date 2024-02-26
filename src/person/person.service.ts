import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class PersonService {
  constructor(private readonly redisService: RedisService) {}

  async getPersonRanking() {
    return this.redisService.zrange('mySortedSet', 10);
  }

  async addPersonRanking() {
    const persons = [
      { ranking: 1, name: '마동석' },
      { ranking: 2, name: '손석구' },
      { ranking: 3, name: '아이유' },
      { ranking: 4, name: '유재석' },
      { ranking: 5, name: '이광수' },
    ];

    for (const person of persons) {
      await this.redisService.zadd('mySortedSet', person.ranking, person.name);
    }
    return true;
  }
}
