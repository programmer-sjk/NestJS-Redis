import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [RedisModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
