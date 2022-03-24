import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class DatabaseEnvironment {
  @IsNumber()
  minConnection: number;

  @IsNumber()
  maxConnection: number;

  @IsNumber()
  connectionTimeout: number;

  @IsString()
  readerHost: string;

  @IsNumber()
  port: number;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsBoolean()
  logging: boolean;
}
