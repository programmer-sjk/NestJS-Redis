import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawalResponse {
  @Exclude()
  private readonly _accountId: number;

  constructor(accountId: number) {
    this._accountId = accountId;
  }

  @ApiProperty()
  @Expose()
  get accountId(): number {
    return this._accountId;
  }
}
