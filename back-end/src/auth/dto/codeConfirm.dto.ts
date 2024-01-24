import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CodeConfirmDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
