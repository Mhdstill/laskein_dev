import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

enum EnumTypeTransaction {
  DEPOSIT = 'DEPOSIT',
  EXCHANGE = 'EXCHANGE',
  WITHDRAWAL = 'WITHDRAWAL',
  PURCHASE = 'PURCHASE',
  SUBSCRIBE = 'SUBSCRIBE',
  BONUS = 'BONUS',
}

enum EnumStatusTransaction {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
}

export class CreateOuterTransactionDto {
  @ApiProperty({ enum: EnumTypeTransaction })
  @IsNotEmpty()
  @IsEnum(EnumTypeTransaction)
  type: EnumTypeTransaction;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: EnumStatusTransaction })
  @IsNotEmpty()
  @IsEnum(EnumStatusTransaction)
  status: EnumStatusTransaction;

  @ApiProperty()
  sourceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  stripeTransactionId;
}
