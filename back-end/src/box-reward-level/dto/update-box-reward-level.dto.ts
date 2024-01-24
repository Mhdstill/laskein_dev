import { PartialType } from '@nestjs/swagger';
import { CreateBoxRewardLevelDto } from './create-box-reward-level.dto';

export class UpdateBoxRewardLevelDto extends PartialType(
  CreateBoxRewardLevelDto,
) {}
