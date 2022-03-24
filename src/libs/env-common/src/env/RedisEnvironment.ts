import { IsNumber, IsString } from 'class-validator';

export class RedisEnvironment {
  @IsString()
  host: string;

  @IsNumber()
  port: number;
}
