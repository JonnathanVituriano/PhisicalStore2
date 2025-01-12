//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\config\database.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (ConfigService: ConfigService) => ({
                uri: ConfigService.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}

//atualização