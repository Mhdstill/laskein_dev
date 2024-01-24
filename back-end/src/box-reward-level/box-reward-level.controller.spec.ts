import { Test, TestingModule } from '@nestjs/testing';
import { BoxRewardLevelController } from './box-reward-level.controller';
import { BoxRewardLevelService } from './box-reward-level.service';

describe('BoxRewardLevelController', () => {
  let controller: BoxRewardLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxRewardLevelController],
      providers: [BoxRewardLevelService],
    }).compile();

    controller = module.get<BoxRewardLevelController>(BoxRewardLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
