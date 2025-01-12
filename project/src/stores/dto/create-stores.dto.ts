//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\dto\create-stores.dto.ts

import { IsString, IsNumber, IsBoolean, IsArray, ArrayMinSize } from "class-validator";

export class CreateStoreDto {
    @IsString()
    storeID: string;

    @IsString()
    storeName: string;

    @IsString()
    address1: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    postalCode: string;

    @IsString()
    type: string;

    @IsNumber()
    shippingTimeInDays: number;

    @IsBoolean()
    takeOutInStore: boolean;

    @IsArray()
    @ArrayMinSize(2)
    coordinates: [number];
}