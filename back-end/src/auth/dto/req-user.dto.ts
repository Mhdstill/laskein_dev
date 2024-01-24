import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class ReqUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isMember: boolean;
}
