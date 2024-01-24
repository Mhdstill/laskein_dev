import { Test, TestingModule } from '@nestjs/testing';
import { ArticlePhotoService } from './article-photo.service';

describe('ArticlePhotoService', () => {
  let service: ArticlePhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlePhotoService],
    }).compile();

    service = module.get<ArticlePhotoService>(ArticlePhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
