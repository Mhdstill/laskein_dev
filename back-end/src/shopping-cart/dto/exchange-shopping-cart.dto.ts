import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ExchangeShoppingCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  shoppingCartId: string[];
}
