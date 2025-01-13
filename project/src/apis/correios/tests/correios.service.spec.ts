//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\apis\correios\tests\correios.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosService } from '../correios.service';

describe('CorreiosService', () => {
  let service: CorreiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorreiosService],
    }).compile();

    service = module.get<CorreiosService>(CorreiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
