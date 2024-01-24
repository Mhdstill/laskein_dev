import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export enum EnumStatusGame {
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export enum EnumVersionGame {
  FULL = 'FULL',
  DEMO = 'DEMO',
}

export enum EnumTypeGame {
  BOX = 'BOX',
  SPONSORED = 'SPONSORED',
  PARENT = 'PARENT',
}

export class CreateGameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userBoxId: string;
}
