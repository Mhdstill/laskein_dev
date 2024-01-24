import { Test, TestingModule } from '@nestjs/testing';
import { BoxTypeService } from './box-type.service';

describe('BoxTypeService', () => {
  let service: BoxTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxTypeService],
    }).compile();

    service = module.get<BoxTypeService>(BoxTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
