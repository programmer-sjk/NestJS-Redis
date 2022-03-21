import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from './logger/src/Logger';
import { Cookies } from './decorator/cookie';
import { ResponseEntity } from './web-common/src/res/ResponseEntity';
import { SessionResponse } from './dto/SessionResponse';
import { ResponseStatus } from './web-common/src/res/ResponseStatus';
import { UserResponse } from './dto/UserResponse';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get('/user')
  async findUser(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<UserResponse | string>> {
    try {
      const user = await this.appService.findUser(connectSid);
      return user ?
        ResponseEntity.OK_WITH(user) :
        ResponseEntity.ERROR_WITH("유효하지 않은 세션입니다.", ResponseStatus.UNAUTHORIZED);;

    } catch(e) {
      this.logger.error(
        `사용자 조회 실패: connectSid=${connectSid}, ${e.message}`,
        e,
      );
      return ResponseEntity.ERROR_WITH(e.message);
    }
  }

  @Get('/session')
  async findSession(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<SessionResponse | string>> {
    try {
      const session = await this.appService.findSession(connectSid);
      return session ?
        ResponseEntity.OK_WITH(session) :
        ResponseEntity.ERROR_WITH("유효하지 않은 세션입니다.", ResponseStatus.UNAUTHORIZED);
    } catch(e) {
      this.logger.error(
        `세션 조회 실패: connectSid=${connectSid}, ${e.message}`,
        e,
      );
      return ResponseEntity.ERROR_WITH(e.message);
    }

  }
}

