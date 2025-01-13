//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\stores.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './entities/store.entity';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { ApisModule } from 'src/apis/apis.module';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    ApisModule,
  ],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}

//atualização