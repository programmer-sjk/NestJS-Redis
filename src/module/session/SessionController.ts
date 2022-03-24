import { CacheKey, Controller, Get } from '@nestjs/common';
import { SessionService } from './SessionService';
import { Cookies } from '../../decorator/cookie';
import { UserResponse } from './dto/UserResponse';
import { ResponseEntity } from '../../libs/web-common/src/res/ResponseEntity';
import { ResponseStatus } from '../../libs/web-common/src/res/ResponseStatus';
import { SessionResponse } from './dto/SessionResponse';
import { Logger } from '../../libs/logger/src/Logger'

@Controller('session')
export class SessionController {
  constructor(
    private readonly userService: SessionService,
    private readonly logger: Logger,
  ) {}

  @Get('/user')
  async findUser(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<UserResponse | string>> {
    try {
      const user = await this.userService.findUser(connectSid);
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

  @Get()
  async findSession(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<SessionResponse | string>> {
    try {
      const session = await this.userService.findSession(connectSid);
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

