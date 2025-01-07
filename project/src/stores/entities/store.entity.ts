import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
    @Prop({ required: true })
    storeID: string;

    @Prop({ required: true })
    storeName: string;

    @Prop({ required: true })
    latitude: string;

    @Prop({ require: true })
    longitude : string;

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
}

export const StoreSchema = SchemaFactory.createForClass(Store);