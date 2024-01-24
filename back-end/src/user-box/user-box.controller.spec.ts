import { Test, TestingModule } from '@nestjs/testing';
import { UserBoxController } from './user-box.controller';
import { UserBoxService } from './user-box.service';

describe('UserBoxController', () => {
  let controller: UserBoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBoxController],
      providers: [UserBoxService],
    }).compile();

    controller = module.get<UserBoxController>(UserBoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
