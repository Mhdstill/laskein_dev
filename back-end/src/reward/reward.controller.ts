import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { BlacklistTokenGuard } from 'src/shared/guards/blacklist-token/blacklist-token.guard';
import { RewardService } from './reward.service';

@ApiTags('Reward')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('/daily')
  async findAllDaily(@Request() req) {
    return await this.rewardService.findAllDaily(req.user);
  }

  @Get('/level')
  async findAllLevel(@Request() req) {
    return await this.rewardService.findAllLevel(req.user);
  }

  @Get('/level/my-total-expense')
  async findAllLevelExpense(@Request() req) {
    return await this.rewardService.findMyExpenseLevel(req.user);
  }

  @Get('/level/my-expense-line')
  async findMyExpenseLine(@Request() req) {
    return await this.rewardService.findMyExpenseLine(req.user);
  }

  @Get('/level/my-historical')
  async findMyHistorical(@Request() req) {
    return await this.rewardService.findMyHistorical(req.user);
  }
}
