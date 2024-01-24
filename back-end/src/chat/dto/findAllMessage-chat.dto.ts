import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindAllMessageChatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  receiverId: string;
}
