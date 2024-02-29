import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, MovieRepository],
})
export class MovieModule {}
