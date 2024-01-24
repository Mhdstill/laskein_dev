import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateShoppingCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  winningDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  gameId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
