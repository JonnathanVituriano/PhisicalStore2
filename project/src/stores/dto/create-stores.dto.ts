//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\dto\create-stores.dto.ts

import { IsString, IsNumber, IsBoolean, IsArray, ArrayMinSize, IsOptional } from "class-validator";

export class CreateStoreDto {
    @IsString()
    storeID: string;

    @IsString()
    storeName: string;

    @IsString()
    @IsOptional()
    address1: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
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
    @IsOptional()
    @ArrayMinSize(2)
    coordinates: [number];
}