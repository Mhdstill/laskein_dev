import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateBoxRewardLevelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  boxId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  rewardLevelId: string;
}
