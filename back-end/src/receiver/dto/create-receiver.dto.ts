import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateReceiverDto {
  @IsOptional()
  @IsDateString()
  readingDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  receiverId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  messageId: string;
}
