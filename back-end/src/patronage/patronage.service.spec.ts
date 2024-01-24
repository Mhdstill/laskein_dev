import { Test, TestingModule } from '@nestjs/testing';
import { PatronageService } from './patronage.service';

describe('PatronageService', () => {
  let service: PatronageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatronageService],
    }).compile();

    service = module.get<PatronageService>(PatronageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
