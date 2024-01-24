import { Test, TestingModule } from '@nestjs/testing';
import { OuterTransactionController } from './outer-transaction.controller';

describe('OuterTransactionController', () => {
  let controller: OuterTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OuterTransactionController],
    }).compile();

    controller = module.get<OuterTransactionController>(
      OuterTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
