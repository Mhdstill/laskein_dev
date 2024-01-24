import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateModelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  keyword: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsMongoId({ each: true })
  permissionIDs?: string[];
}
