import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export enum EnumPriceSubscription {
  ONEMONTH = 'ONEMONTH',
  THREEMONTHS = 'THREEMONTHS',
}

export enum EnumStatusSubscription {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELED = 'CANCELED',
}

export class CreateSubscriptionDto {
  @ApiProperty({ enum: EnumPriceSubscription })
  @IsNotEmpty()
  @IsEnum(EnumPriceSubscription)
  nbMonth: EnumPriceSubscription;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  offerId: string;
}
