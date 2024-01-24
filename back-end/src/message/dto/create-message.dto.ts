import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsDateString()
  sendingDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;
}
