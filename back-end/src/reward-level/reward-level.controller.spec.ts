import { Test, TestingModule } from '@nestjs/testing';
import { RewardLevelController } from './reward-level.controller';
import { RewardLevelService } from './reward-level.service';

describe('RewardLevelController', () => {
  let controller: RewardLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardLevelController],
      providers: [RewardLevelService],
    }).compile();

    controller = module.get<RewardLevelController>(RewardLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
