import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  priceThreeMonth: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numberMysteryBoxBronze: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numberMysteryBoxSylver: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numberMysteryBoxGold: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isAwardLevelActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isWeeklyAwardActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isStandardSupportActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isVIPSupportActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  duration?: number;
}
