import { Test, TestingModule } from '@nestjs/testing';
import { OuterTransactionService } from './outer-transaction.service';

describe('OuterTransactionService', () => {
  let service: OuterTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OuterTransactionService],
    }).compile();

    service = module.get<OuterTransactionService>(OuterTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
