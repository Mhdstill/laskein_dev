import { Test, TestingModule } from '@nestjs/testing';
import { BoxParamsController } from './box-params.controller';
import { BoxParamsService } from './box-params.service';

describe('BoxParamsController', () => {
  let controller: BoxParamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxParamsController],
      providers: [BoxParamsService],
    }).compile();

    controller = module.get<BoxParamsController>(BoxParamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
