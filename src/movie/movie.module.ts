import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, RedisService, MovieRepository],
})
export class MovieModule {}
