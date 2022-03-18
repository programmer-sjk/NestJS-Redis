import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  async getTest(): Promise<string> {
    console.log(
      await this.cacheManager.get('sess:3WZ5AsP415l30HIlGsS6kgGnGHgZCLS-'),
      await this.cacheManager.get('abc'),
    )
    return 'testest';
  }

  @Get('/test2')
  async getTest2(): Promise<string> {
    console.log(
      await this.cacheManager.set('abc', 'ddd'),
    )
    return 'testest';
  }
}
