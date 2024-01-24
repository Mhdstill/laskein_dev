import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTemoignageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  commentDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isToShow: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
