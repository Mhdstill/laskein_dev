import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePriceDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  currentPrice: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rate?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sellingPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  reduction?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  articleId: string;
}
