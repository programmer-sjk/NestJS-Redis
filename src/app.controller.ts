import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from './logger/src/Logger';
import { Cookies } from './decorator/cookie';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get('/user')
  async findUser(@Cookies('connect.sid') connectSid: string): Promise<string> {
    try {
      return await this.appService.findUser(connectSid);
    } catch(e) {
      this.logger.error(
        `사용자 조회 실패: connectSid=${connectSid}, ${e.message}`,
        e,
      );
    }
  }

  @Get('/session')
  async findSession(@Cookies('connect.sid') connectSid: string): Promise<number> {
    try {
      return await this.appService.findSession(connectSid);
    } catch(e) {
      this.logger.error(
        `세션 조회 실패: connectSid=${connectSid}, ${e.message}`,
        e,
      );
    }

  }
}

