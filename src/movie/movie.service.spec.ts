import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../../ormconfig';
import { MovieRepository } from './movie.repository';
import { MovieModule } from './movie.module';
import { RedisService } from '../redis/redis.service';
import { RedisModule } from '../redis/redis.module';

describe('MovieService', () => {
  let service: MovieService;
  let redisService: RedisService;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...connectionOptions, logging: false }),
        TypeOrmModule.forFeature([Movie]),
        MovieModule,
        RedisModule,
      ],
      providers: [MovieService, RedisService, MovieRepository],
    }).compile();

    service = module.get<MovieService>(MovieService);
    redisService = module.get<RedisService>(RedisService);
    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('동시에 10개 요청', async () => {
    // given
    // DB에 추천 수가 0인 1번 영화를 수동으로 만들어 둠

    // when
    await Promise.all([
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
      service.increaseRecommendCount(1),
    ]);

    // then
    const movie = await movieRepository.findOne(1);
    expect(movie.recommendCount).toBe(10);
  });

  it('set nx 동시에 10개 요청', async () => {
    // given
    // DB에 추천 수가 0인 1번 영화를 수동으로 만들어 둠

    // when
    await Promise.all([
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
      service.increaseRecommendCountBySetNx(1),
    ]);

    // then
    const movie = await movieRepository.findOne(1);
    expect(movie.recommendCount).toBe(10);
  });

  it('redlock 동시에 10개 요청', async () => {
    // given
    // DB에 추천 수가 0인 1번 영화를 수동으로 만들어 둠

    // when
    await Promise.all([
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
      service.increaseRecommendCountByRedLock(1),
    ]);

    // then
    const movie = await movieRepository.findOne(1);
    expect(movie.recommendCount).toBe(10);
  });
});
