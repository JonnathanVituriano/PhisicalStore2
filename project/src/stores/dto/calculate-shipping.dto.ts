//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\dto\calculate-shipping.dto.ts

import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CalculateShippingDto {
  @IsString()
  @IsNotEmpty()
  cepOrigem: string;

  @IsString()
  @IsNotEmpty()
  cepDestino: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  peso: number;
}