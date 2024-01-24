import { Test, TestingModule } from '@nestjs/testing';
import { UserBoxService } from './user-box.service';

describe('UserBoxService', () => {
  let service: UserBoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBoxService],
    }).compile();

    service = module.get<UserBoxService>(UserBoxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
