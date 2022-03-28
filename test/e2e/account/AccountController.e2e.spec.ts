import * as request from 'supertest';
import { CACHE_MANAGER, HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '../../../src/ApiModule';
import { setNestApp } from '../../../src/libs/web-common/src/app/setNestApp';
import { Cache } from 'cache-manager';
import { SessionResponse } from '../../../src/module/session/dto/SessionResponse';
import { ResponseStatus } from '../../../src/libs/web-common/src/res/ResponseStatus';
import { ResponseEntity } from '../../../src/libs/web-common/src/res/ResponseEntity';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let cacheManager: Cache;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    cacheManager = module.get<Cache>(CACHE_MANAGER);
    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => await cacheManager.reset());
  afterAll(async () => await app.close());

  it('헤더 쿠키 값이 Redis 에 있을 경우, account 정보를 반환한다.', async () => {
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
    await cacheManager.set('sess:3WZ5AsP415l30HIlGsS6kgGnGHgZCLS-', session);
    const connectSid = 's%3A3WZ5AsP415l30HIlGsS6kgGnGHgZCLS-.ii5S1YsHbMJzxVxVhH2alTHrAecgTJtRSpG7qxAjFbs;'

    // when
    const response = await request(app.getHttpServer())
      .get(`/api/account`)
      .set('Cookie', [`connect.sid=${connectSid}`])
      .send();

    // then
    expect(response.status).toBe(HttpStatus.OK);
    const body: ResponseEntity<SessionResponse> = response.body;
    expect(body.statusCode).toBe(ResponseStatus.OK);
    expect(body.data.accountId).toBe(expectedUserId);
  });

  it('헤더 쿠키 값이 Redis 에 없을 경우, UNAUTHORIZED를 반환한다.', async () => {
    // given
    const connectSid = 's%3A3WZ5AsP415l30HIlGsS6kgGnGHgZCLS-.ii5S1YsHbMJzxVxVhH2alTHrAecgTJtRSpG7qxAjFbs;'

    // when
    const response = await request(app.getHttpServer())
      .get(`/api/account`)
      .set('Cookie', [`connect.sid=${connectSid}`])
      .send();

    // then
    expect(response.status).toBe(HttpStatus.OK);
    const body: ResponseEntity<SessionResponse> = response.body;
    expect(body.statusCode).toBe(ResponseStatus.UNAUTHORIZED);
  });

  it('정합성이 맞지 않는 쿠키가 들어올 경우 정합성 불일치 에러가 발생한다.', async () => {
    // when
    const response = await request(app.getHttpServer())
      .get(`/api/account`)
      .set('Cookie', [`connect.sid=`])
      .send();

    // then
    expect(response.status).toBe(HttpStatus.OK);
    const body: ResponseEntity<SessionResponse> = response.body;
    expect(body.statusCode).toBe(ResponseStatus.SERVER_ERROR);
    expect(body.message).toBe('정합성 불일치, connectSid=');
  });
});
