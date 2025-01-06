import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
