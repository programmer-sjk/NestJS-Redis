import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './AppModule';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { setNestApp } from './web-common/src/app/setNestApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error']
  });

  setNestApp(app);
  await app.listen(3000);
}
bootstrap();
