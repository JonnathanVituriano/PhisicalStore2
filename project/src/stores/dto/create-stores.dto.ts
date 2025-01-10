import { IsString, IsNumber, IsBoolean, IsArray } from "class-validator";

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
    coordinates: [number];
}