import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

enum EnumPermission {
  READ = 'READ',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class CreatePermissionDto {
  @ApiProperty({ enum: EnumPermission })
  @IsNotEmpty()
  @IsEnum(EnumPermission)
  name: EnumPermission;

  @ApiProperty()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsMongoId({ each: true })
  rulesIDs?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsMongoId({ each: true })
  modelsIDs?: string[];
}
