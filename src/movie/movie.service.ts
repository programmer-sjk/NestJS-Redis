import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async increaseRecommendCount(id: number) {
    const movie = await this.movieRepository.findOne(id);
    await this.movieRepository.updateRecommendCount(
      id,
      movie.recommendCount + 1
    );
  }
}
