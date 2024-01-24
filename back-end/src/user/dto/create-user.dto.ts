import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

enum EnumGender {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  isActif: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @ApiProperty({ enum: EnumGender })
  @IsOptional()
  @IsEnum(EnumGender)
  gender?: EnumGender;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  refreshToken?: string;

  @IsOptional()
  @IsString()
  socketId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
