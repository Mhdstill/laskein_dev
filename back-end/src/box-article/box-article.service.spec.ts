import { Test, TestingModule } from '@nestjs/testing';
import { BoxArticleService } from './box-article.service';

describe('BoxArticleService', () => {
  let service: BoxArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxArticleService],
    }).compile();

    service = module.get<BoxArticleService>(BoxArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
