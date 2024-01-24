import { PartialType } from '@nestjs/swagger';
import { CreateDailyRewardDto } from './create-daily-reward.dto';

export class UpdateDailyRewardDto extends PartialType(CreateDailyRewardDto) {}
