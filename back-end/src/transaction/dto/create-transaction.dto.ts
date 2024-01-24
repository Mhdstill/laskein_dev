import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export enum EnumTypeTransaction {
  DEPOSIT = 'DEPOSIT',
  EXCHANGE = 'EXCHANGE',
  WITHDRAWAL = 'WITHDRAWAL',
  PURCHASE = 'PURCHASE',
  SUBSCRIBE = 'SUBSCRIBE',
  BONUS = 'BONUS',
}

export enum EnumStatusTransaction {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
}

export class CreateTransactionDto {
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
  @IsNotEmpty()
  @IsMongoId()
  boxId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  offerId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  walletId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  shoppingCartId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  bankId?: string;
}
