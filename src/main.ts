import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { setNestApp } from './libs/web-common/src/app/setNestApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error']
  });

  setNestApp(app);
  await app.listen(3000);
}
bootstrap();
