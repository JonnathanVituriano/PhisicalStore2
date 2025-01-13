//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\dto\calculate-shipping.dto.ts

import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CalculateShippingDto {
  @IsString()
  @IsNotEmpty()
  cepOrigem: string;

  @IsString()
  @IsNotEmpty()
  cepDestino: string;

  @IsNumber()
  peso: number;
}