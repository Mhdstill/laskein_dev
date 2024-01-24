import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum EnumHistoricalAction {
  READ = 'READ',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class CreateHistoricalDto {
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @ApiProperty({ enum: EnumHistoricalAction })
  @IsNotEmpty()
  @IsEnum(EnumHistoricalAction)
  action: EnumHistoricalAction;
}
