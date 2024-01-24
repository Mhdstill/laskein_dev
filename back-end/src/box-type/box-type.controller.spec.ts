import { Test, TestingModule } from '@nestjs/testing';
import { BoxTypeController } from './box-type.controller';
import { BoxTypeService } from './box-type.service';

describe('BoxTypeController', () => {
  let controller: BoxTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxTypeController],
      providers: [BoxTypeService],
    }).compile();

    controller = module.get<BoxTypeController>(BoxTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
