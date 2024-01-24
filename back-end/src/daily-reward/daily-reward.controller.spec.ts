import { Test, TestingModule } from '@nestjs/testing';
import { DailyRewardController } from './daily-reward.controller';
import { DailyRewardService } from './daily-reward.service';

describe('DailyRewardController', () => {
  let controller: DailyRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyRewardController],
      providers: [DailyRewardService],
    }).compile();

    controller = module.get<DailyRewardController>(DailyRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
