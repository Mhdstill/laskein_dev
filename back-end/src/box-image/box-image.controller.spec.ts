import { Test, TestingModule } from '@nestjs/testing';
import { BoxImageController } from './box-image.controller';
import { BoxImageService } from './box-image.service';

describe('BoxImageController', () => {
  let controller: BoxImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxImageController],
      providers: [BoxImageService],
    }).compile();

    controller = module.get<BoxImageController>(BoxImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
