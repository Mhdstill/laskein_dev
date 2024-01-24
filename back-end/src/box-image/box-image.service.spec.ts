import { Test, TestingModule } from '@nestjs/testing';
import { BoxImageService } from './box-image.service';

describe('BoxImageService', () => {
  let service: BoxImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxImageService],
    }).compile();

    service = module.get<BoxImageService>(BoxImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
