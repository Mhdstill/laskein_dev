import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum EnumBannerImageType {
  WELCOME = 'WELCOME',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SPONSORSHIP = 'SPONSORSHIP',
  ADVERTISEMENT = 'ADVERTISEMENT',
}

export class CreateBannerImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bannerImgUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bannerLink?: string;

  @ApiProperty({ enum: EnumBannerImageType })
  @IsOptional()
  @IsEnum(EnumBannerImageType)
  type?: EnumBannerImageType;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  boxId?: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  offerId?: string;
}
