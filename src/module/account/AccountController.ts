import { Controller, Get } from '@nestjs/common';
import { Cookies } from '../../decorator/cookie';
import { AccountResponse } from './dto/AccountResponse';
import { AccountService } from './AccountService';
import { ResponseEntity } from '../../libs/web-common/src/res/ResponseEntity';
import { ResponseStatus } from '../../libs/web-common/src/res/ResponseStatus';
import { Logger } from '../../libs/logger/src/Logger'

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findUser(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<AccountResponse | string>> {
    try {
      const user = await this.accountService.findUser(connectSid);
      return user ?
        ResponseEntity.OK_WITH(user) :
        ResponseEntity.ERROR_WITH("유효하지 않은 세션입니다.", ResponseStatus.UNAUTHORIZED);

    } catch(e) {
      this.logger.error(
        `사용자 조회 실패: connectSid=${connectSid}, ${e.message}`,
        e,
      );
      return ResponseEntity.ERROR_WITH(e.message);
    }
  }
}

