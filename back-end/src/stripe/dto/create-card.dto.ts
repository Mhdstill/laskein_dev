import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  payementMethodId: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;
}
