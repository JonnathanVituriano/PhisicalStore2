//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\apis\via-cep\tests\via-cep.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ViaCepService } from '../via-cep.service';

describe('ViaCepService', () => {
  let service: ViaCepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViaCepService],
    }).compile();

    service = module.get<ViaCepService>(ViaCepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
