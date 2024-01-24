import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

enum EnumBoxImageStatus {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
  PLAYING = 'PLAYING',
  OTHER = 'OTHER',
}

export class CreateBoxImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @ApiProperty({ enum: EnumBoxImageStatus })
  @IsNotEmpty()
  @IsEnum(EnumBoxImageStatus)
  status: EnumBoxImageStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  boxId: string;
}
