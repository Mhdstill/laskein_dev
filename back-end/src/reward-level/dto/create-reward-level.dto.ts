import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRewardLevelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unlockThreshold: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
