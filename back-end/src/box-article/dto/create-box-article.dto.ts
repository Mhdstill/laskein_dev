import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBoxArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  winningChance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  boxId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  articleId: string;
}
