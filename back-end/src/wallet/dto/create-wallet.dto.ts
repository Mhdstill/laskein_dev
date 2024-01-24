import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
