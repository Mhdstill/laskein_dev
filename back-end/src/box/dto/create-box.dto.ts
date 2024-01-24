import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum EnumBadgeBox {
  TENDANCE = 'TENDANCE',
  SOLDE = 'SOLDE',
}

export class CreateBoxDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reference: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: EnumBadgeBox })
  @IsOptional()
  @IsEnum(EnumBadgeBox)
  badge?: EnumBadgeBox;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  boxTypeId: string;
}
