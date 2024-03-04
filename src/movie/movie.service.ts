import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { RedisService } from '../redis/redis.service';
import { sleep } from '../common/sleep';
import { Lock } from 'redlock';

@Injectable()
export class MovieService {
  constructor(
    private readonly redisService: RedisService,
    private readonly movieRepository: MovieRepository
  ) {}

  async increaseRecommendCount(id: number) {
    const movie = await this.movieRepository.findOne(id);
    await this.movieRepository.updateRecommendCount(
      id,
      movie.recommendCount + 1
    );
  }

  async increaseRecommendCountBySetNx(id: number) {
    const key = 'cacheKey';
    while (!(await this.redisService.setNx(key, 'value'))) {
      await sleep(100);
    }

    const movie = await this.movieRepository.findOne(id);
    await this.movieRepository.updateRecommendCount(
      id,
      movie.recommendCount + 1
    );

    await this.redisService.del(key);
  }

  async increaseRecommendCountByRedLock(id: number) {
    let lock: Lock;
    try {
      lock = await this.redisService.acquireLock(
        `increase-recommend-count:${id}`
      );

      const movie = await this.movieRepository.findOne(id);
      await this.movieRepository.updateRecommendCount(
        id,
        movie.recommendCount + 1
      );
    } catch (err) {
      throw err;
    } finally {
      await lock.release();
    }
  }
}
