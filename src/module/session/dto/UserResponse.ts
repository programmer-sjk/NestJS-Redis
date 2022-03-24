import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @Exclude()
  private readonly _userId: number;

  @Exclude()
  private readonly _accountId: number;

  @Exclude()
  private readonly _name: string;

  @Exclude()
  private readonly _realName: string;

  @Exclude()
  private readonly _email: string;

  @Exclude()
  private readonly _allowedMarketing: boolean;

  @Exclude()
  private readonly _mobile: string;

  @Exclude()
  private readonly _countryCode: string;

  constructor(
    accountId: number,
    name: string,
    realName: string,
    email: string,
    allowedMarketing: boolean,
    mobile: string,
    countryCode: string,
  ) {
    this._accountId = accountId;
    this._name = name;
    this._realName = realName;
    this._email = email;
    this._allowedMarketing = allowedMarketing;
    this._mobile = mobile;
    this._countryCode = countryCode;
  }

  @ApiProperty()
  @Expose()
  get accountId(): number {
    return this._accountId;
  }

  @ApiProperty()
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty()
  @Expose()
  get realName(): string {
    return this._realName;
  }

  @ApiProperty()
  @Expose()
  get email(): string {
    return this._email;
  }

  @ApiProperty()
  @Expose()
  get allowedMarketing(): boolean {
    return this._allowedMarketing;
  }

  @ApiProperty()
  @Expose()
  get mobile(): string {
    return this._mobile;
  }

  @ApiProperty()
  @Expose()
  get countryCode(): string {
    return this._countryCode;
  }
}
