import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

enum EnumTypeMode {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
  CHILD = 'CHILD',
}

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reference: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({ enum: EnumTypeMode })
  @IsOptional()
  @IsEnum(EnumTypeMode)
  type?: EnumTypeMode;

  @ApiProperty()
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  productUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  winningChance?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  providerId: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  unitySizeId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  subCategoryId: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  boxId?: string;
}
