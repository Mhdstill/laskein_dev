import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export enum EnumStatusPatronage {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  END = 'END',
}

export class CreatePatronageDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  gainPercentage?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountPercentage?: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  bonusEndDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userParentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userChildId: string;
}
