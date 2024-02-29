import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieRepository {
  constructor(@InjectRepository(Movie) private repository: Repository<Movie>) {}
  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async updateRecommendCount(id: number, recommendCount: number) {
    return this.repository.update(id, { recommendCount });
  }
}
