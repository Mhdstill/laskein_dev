import { Test, TestingModule } from '@nestjs/testing';
import { BoxRewardLevelService } from './box-reward-level.service';

describe('BoxRewardLevelService', () => {
  let service: BoxRewardLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxRewardLevelService],
    }).compile();

    service = module.get<BoxRewardLevelService>(BoxRewardLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
