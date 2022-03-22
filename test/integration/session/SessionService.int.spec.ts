import { SessionService } from '../../../src/module/session/SessionService';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/AppModule';

describe('AuthB2bService', () => {
  let sessionService: SessionService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
  });

  beforeEach(() =>{});

  it('', () => {

  })
});
