import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '../../../src/ApiModule';
import { setNestApp } from '../../../src/libs/web-common/src/app/setNestApp';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  afterAll(async () => await app.close());

  it('GET /health 요청은 DB와 App 상태를 체크해서 응답을 내려준다', async () => {
    // when
    const response = await request(app.getHttpServer())
      .get(`/api/health`)
      .send();

    // then
    expect(response.body?.status).toBe('ok');
    expect(response.body?.info?.database?.status).toBe('up');
  });
});
