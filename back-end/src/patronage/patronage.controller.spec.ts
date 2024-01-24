import { Test, TestingModule } from '@nestjs/testing';
import { PatronageController } from './patronage.controller';
import { PatronageService } from './patronage.service';

describe('PatronageController', () => {
  let controller: PatronageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatronageController],
      providers: [PatronageService],
    }).compile();

    controller = module.get<PatronageController>(PatronageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
