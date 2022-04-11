import { Controller, Delete, Get, Post } from '@nestjs/common';
import { SessionService } from './SessionService';
import { Cookies } from '../../decorator/cookie';
import { ResponseEntity } from '../../libs/web-common/src/res/ResponseEntity';
import { ResponseStatus } from '../../libs/web-common/src/res/ResponseStatus';
import { SessionResponse } from './dto/SessionResponse';
import { Logger } from '../../libs/logger/src/Logger'

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findSession(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<SessionResponse | string>> {
    try {
      const session = await this.sessionService.findSession(connectSid);
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

  @Delete('delete')
  async deleteSession(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<SessionResponse | string>> {
    try {
      await this.sessionService.deleteSession(connectSid);
      return ResponseEntity.OK();
    } catch(e) {
      this.logger.error(
        `레디스 세션 삭제 실패: connectSid=${connectSid}, ${e.message}`,
        e,
      );
      return ResponseEntity.ERROR_WITH(e.message);
    }

  }
}

