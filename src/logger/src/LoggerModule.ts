import { DynamicModule } from '@nestjs/common';
import { Logger } from './Logger';
import { createLogger } from 'winston';
import { getWinstonLoggerOption } from './getWinstonLoggerOption';

export class LoggerModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [
        {
          provide: Logger,
          useFactory: () => createLogger(getWinstonLoggerOption()),
        },
      ],
      exports: [Logger],
    };
  }
}
