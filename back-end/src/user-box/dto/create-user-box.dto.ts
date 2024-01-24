import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export enum EnumUserBoxType {
  PURCHASE = 'PURCHASE',
  REWARD_LEVEL = 'REWARD_LEVEL',
  DAILY_REWARD = 'DAILY_REWARD',
}

export class CreateUserBoxDto {
  @ApiProperty({ enum: EnumUserBoxType })
  @IsOptional()
  @IsEnum(EnumUserBoxType)
  type: EnumUserBoxType;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  duration?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPlayed?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isLocked?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  playedDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  boxId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
