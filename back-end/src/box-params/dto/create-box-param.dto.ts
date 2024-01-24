import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBoxParamDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isBestSelling?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRecommended?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isBigPrice?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isSubsciptionBonus?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  boxId: string;
}
