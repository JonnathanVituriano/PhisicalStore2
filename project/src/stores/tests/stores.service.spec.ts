//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\tests\stores.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from '../stores.service';

describe('StoresService', () => {
  let service: StoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoresService],
    }).compile();

    service = module.get<StoresService>(StoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

//atualização
