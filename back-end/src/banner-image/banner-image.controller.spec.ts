import { Test, TestingModule } from '@nestjs/testing';
import { BannerImageController } from './banner-image.controller';
import { BannerImageService } from './banner-image.service';

describe('BannerImageController', () => {
  let controller: BannerImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannerImageController],
      providers: [BannerImageService],
    }).compile();

    controller = module.get<BannerImageController>(BannerImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
