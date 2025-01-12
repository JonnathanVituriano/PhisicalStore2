//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\apis\apis.module.ts

import { Module } from '@nestjs/common';
import { ViaCepService } from './via-cep/via-cep.service';
import { GoogleMapsService } from './google-maps/google-maps.service';
import { CorreiosService } from './correios/correios.service';

@Module({
  providers: [ViaCepService, GoogleMapsService, CorreiosService],
  exports: [ViaCepService, GoogleMapsService, CorreiosService]
})
export class ApisModule {}
