import * as request from 'supertest';
import { CACHE_MANAGER, CacheModule, HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/AppModule';
import { SessionResponse } from '../../../src/dto/SessionResponse';
import { ResponseEntity } from '../../../src/web-common/src/res/ResponseEntity';
import { setNestApp } from '../../../src/web-common/src/app/setNestApp';
import { ResponseStatus } from '../../../src/web-common/src/res/ResponseStatus';

describe('SessionController (e2e)', () => {
  let app: INestApplication;
  let cacheManager: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        CacheModule.register({}),
      ],
    }).compile();

    cacheManager = module.get<any>(CACHE_MANAGER);
    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  afterAll(async () => {
    await cacheManager.reset();
    await app.close()
  });

  it('http header 의 cookie 값으로부터 redis 에 해당 값이 있는지 확인할 수 있다.', async () => {
    // given
    const expectedUserId = 168722;
    const session = {
      cookie: {
        originalMaxAge: 604800000,
        expires: '2022-03-28T08:12:47.057Z',
        secure: true,
        httpOnly: true,
        path: '/'
      },
      user_id: expectedUserId,
      redirect_to: 'https://test.inflearn.com/',
      '$newMSG$': { '@': 1647850365436, d: { id: 7640 } }
    }
    await cacheManager.set('sess:3WZ5AsP415l30HIlGsS6kgGnGHgZCLS-', JSON.stringify(session));
    const connectSid = 's%3A3WZ5AsP415l30HIlGsS6kgGnGHgZCLS-.ii5S1YsHbMJzxVxVhH2alTHrAecgTJtRSpG7qxAjFbs;'

    // when
    const response = await request(app.getHttpServer())
      .get(`/api/session`)
      .set('Cookie', [`connect.sid=${connectSid}`])
      .send();

    // then
    expect(response.status).toBe(HttpStatus.OK);
    const body: ResponseEntity<SessionResponse> = response.body;
    expect(body.statusCode).toBe(ResponseStatus.OK);
    expect(body.data.accountId).toBe(expectedUserId);
  });
});
