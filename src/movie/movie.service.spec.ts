import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../../ormconfig';
import { MovieRepository } from './movie.repository';
import { MovieModule } from './movie.module';

describe('MovieService', () => {
  let service: MovieService;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...connectionOptions, logging: false }),
        TypeOrmModule.forFeature([Movie]),
        MovieModule,
      ],
      providers: [MovieService, MovieRepository],
    }).compile();

    movieRepository = module.get<MovieRepository>(MovieRepository);
    service = module.get<MovieService>(MovieService);
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
});
