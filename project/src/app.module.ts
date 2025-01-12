//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { StoresModule } from './stores/stores.module';
import { ApisModule } from './apis/apis.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        DatabaseModule,
        StoresModule,
        ApisModule,
    ]
})
export class AppModule {}

//atualização