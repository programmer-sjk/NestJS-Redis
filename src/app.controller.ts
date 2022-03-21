import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource, getConnectionManager, getManager } from "typeorm"

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  getHello(): string {
    return 'aa';
    // return this.appService.getHello();
  }

  @Get('/user')
  async getTest(): Promise<string> {
    await this.appService.findUser();
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
