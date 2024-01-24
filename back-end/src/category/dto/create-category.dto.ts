import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reference: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
