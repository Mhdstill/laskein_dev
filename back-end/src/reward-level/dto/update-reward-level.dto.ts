import { PartialType } from '@nestjs/swagger';
import { CreateRewardLevelDto } from './create-reward-level.dto';

export class UpdateRewardLevelDto extends PartialType(CreateRewardLevelDto) {}
