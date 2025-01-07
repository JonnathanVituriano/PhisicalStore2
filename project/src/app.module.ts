import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { StoresModule } from './stores/stores.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        DatabaseModule,
        StoresModule,
    ]
})
export class AppModule {}

