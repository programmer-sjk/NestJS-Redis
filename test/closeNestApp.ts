import { CACHE_MANAGER } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';

export async function closeNestApp(app: INestApplication) {
  await app.close();
  const redisClient = app.get(CACHE_MANAGER).store.getClient();
  redisClient.quit()
}
