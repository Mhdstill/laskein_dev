import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsMongoId({ each: true })
  permissionIDs?: string[];
}
