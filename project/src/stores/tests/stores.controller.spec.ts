//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\dto\create-stores.dto.ts

import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from '../stores.controller';

describe('StoresController', () => {
  let controller: StoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
    }).compile();

    controller = module.get<StoresController>(StoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

//atualização₢
