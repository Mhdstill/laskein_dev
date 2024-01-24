import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

enum EnumArticlePhotoStatus {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  LAST = 'LAST',
}

export class CreateArticlePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @ApiProperty({ enum: EnumArticlePhotoStatus })
  @IsNotEmpty()
  @IsEnum(EnumArticlePhotoStatus)
  status: EnumArticlePhotoStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  articleId: string;
}
