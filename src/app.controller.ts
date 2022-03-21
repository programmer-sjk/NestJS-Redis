import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  async getTest(): Promise<string> {
    
    return 'testest';
  }
  //
  // @Get('/test2')
  // async getTest2(): Promise<string> {
  //   console.log(
  //     await this.cacheManager.set('abc', 'ddd'),
  //   )
  //   return 'testest';
  // }
}
