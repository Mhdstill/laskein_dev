import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateNewsLetterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
