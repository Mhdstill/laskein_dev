import { Test, TestingModule } from '@nestjs/testing';
import { UnitySizeController } from './unity-size.controller';
import { UnitySizeService } from './unity-size.service';

describe('UnitySizeController', () => {
  let controller: UnitySizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitySizeController],
      providers: [UnitySizeService],
    }).compile();

    controller = module.get<UnitySizeController>(UnitySizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
