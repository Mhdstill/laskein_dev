import { Test, TestingModule } from '@nestjs/testing';
import { DailyRewardService } from './daily-reward.service';

describe('DailyRewardService', () => {
  let service: DailyRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyRewardService],
    }).compile();

    service = module.get<DailyRewardService>(DailyRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
