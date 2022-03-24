import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DatabaseEnvironment } from './DatabaseEnvironment';
import { RedisEnvironment } from './RedisEnvironment';

export class Environment {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => DatabaseEnvironment)
  database: DatabaseEnvironment;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => RedisEnvironment)
  redis: RedisEnvironment;
}
