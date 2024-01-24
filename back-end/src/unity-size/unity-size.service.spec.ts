import { Test, TestingModule } from '@nestjs/testing';
import { UnitySizeService } from './unity-size.service';

describe('UnitySizeService', () => {
  let service: UnitySizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitySizeService],
    }).compile();

    service = module.get<UnitySizeService>(UnitySizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
