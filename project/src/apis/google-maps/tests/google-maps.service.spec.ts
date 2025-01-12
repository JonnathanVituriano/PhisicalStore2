//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\apis\google-maps\tests\google-maps.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMapsService } from '../google-maps.service';

describe('GoogleMapsService', () => {
  let service: GoogleMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleMapsService],
    }).compile();

    service = module.get<GoogleMapsService>(GoogleMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
