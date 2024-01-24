import { Test, TestingModule } from '@nestjs/testing';
import { RewardLevelService } from './reward-level.service';

describe('RewardLevelService', () => {
  let service: RewardLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardLevelService],
    }).compile();

    service = module.get<RewardLevelService>(RewardLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
