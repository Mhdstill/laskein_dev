import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChargeDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
