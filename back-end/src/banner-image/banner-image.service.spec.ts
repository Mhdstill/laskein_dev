import { Test, TestingModule } from '@nestjs/testing';
import { BannerImageService } from './banner-image.service';

describe('BannerImageService', () => {
  let service: BannerImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerImageService],
    }).compile();

    service = module.get<BannerImageService>(BannerImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
