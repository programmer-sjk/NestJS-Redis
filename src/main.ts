import { NestFactory } from '@nestjs/core';
import { ApiModule } from './ApiModule';
import { setNestApp } from './libs/web-common/src/app/setNestApp';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    logger: ['log', 'error']
  });

  setNestApp(app);
  await app.listen(5000);
}
bootstrap();
