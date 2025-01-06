import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const DatabaseModule = MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/physical-store');
