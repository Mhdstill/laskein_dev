import { Test, TestingModule } from '@nestjs/testing';
import { BoxParamsService } from './box-params.service';

describe('BoxParamsService', () => {
  let service: BoxParamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxParamsService],
    }).compile();

    service = module.get<BoxParamsService>(BoxParamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
