import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  ONDELIVERY = 'ONDELIVERY',
  DELIVERED = 'DELIVERED',
}

export class CreateOrderDto {
  @ApiProperty({ enum: EnumOrderStatus })
  @IsNotEmpty()
  @IsEnum(EnumOrderStatus)
  status: EnumOrderStatus;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  followedLink?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  orderNumber?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  shoppingCartId: string;
}
