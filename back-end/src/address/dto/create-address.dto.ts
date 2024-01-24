import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstAdress: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondAdress?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  zipCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  additionnalInformation?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
