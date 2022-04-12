import { Controller, Get } from '@nestjs/common';
import { Cookies } from '../../decorator/cookie';
import { AccountResponse } from './dto/AccountResponse';
import { AccountService } from './AccountService';
import { ResponseEntity } from '../../libs/web-common/src/res/ResponseEntity';
import { ResponseStatus } from '../../libs/web-common/src/res/ResponseStatus';
import { Logger } from '../../libs/logger/src/Logger'
import { WithdrawalResponse } from './dto/withdrawalResponse';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAccount(@Cookies('connect.sid') connectSid: string): Promise<ResponseEntity<AccountResponse | string>> {
    try {
      const account = await this.accountService.findAccount(connectSid);
      return account ?
        ResponseEntity.OK_WITH(account) :
        ResponseEntity.ERROR_WITH("유효하지 않은 세션입니다.", ResponseStatus.UNAUTHORIZED);

    } catch(e) {
      this.logger.error(
        `사용자 조회 실패: connectSid=${connectSid}, ${e.message}`,
        e,
      );
      return ResponseEntity.ERROR_WITH(e.message);
    }
  }

  @Get('withdrawal')
  async findWithdrawalAccounts(): Promise<
    ResponseEntity<WithdrawalResponse[] | string>
    > {
    try {
      const accounts = await this.accountService.findWithdrawalAccounts();
      return ResponseEntity.OK_WITH(accounts);
    } catch (e) {
      this.logger.error(`탈퇴한 유저 조회 실패, ${e.message}`, e);
      return ResponseEntity.ERROR_WITH(e.message);
    }
  }
}

