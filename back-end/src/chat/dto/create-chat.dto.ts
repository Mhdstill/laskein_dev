import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  receiverId: string;
}
