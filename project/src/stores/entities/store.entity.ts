//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\entities\store.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {

    @Prop({ required: true })
    storeID: string;

    @Prop({ required: true })
    storeName: string;

    @Prop({ require: true })
    address1: string;

    @Prop({ require: true })
    city: string;

    @Prop({ require: true })
    state: string;

    @Prop({ require: true })
    postalCode: string;

    @Prop({ require: true })
    type: string; // PDV | lOJA

    @Prop({ require: true })
    shippingTimeInDays: number;
    
    @Prop({ require: true })
    takeOutInStore: boolean;

    @Prop({ required: true, index: '2dsphere' })
    coordinates: [number];
}

export const StoreSchema = SchemaFactory.createForClass(Store);

//atualização