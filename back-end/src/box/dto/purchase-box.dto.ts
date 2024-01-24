import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PurchaseBoxDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  boxId: string;
}
