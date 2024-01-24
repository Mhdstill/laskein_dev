import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}
