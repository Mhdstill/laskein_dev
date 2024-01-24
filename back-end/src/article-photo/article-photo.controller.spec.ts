import { Test, TestingModule } from '@nestjs/testing';
import { ArticlePhotoController } from './article-photo.controller';
import { ArticlePhotoService } from './article-photo.service';

describe('ArticlePhotoController', () => {
  let controller: ArticlePhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlePhotoController],
      providers: [ArticlePhotoService],
    }).compile();

    controller = module.get<ArticlePhotoController>(ArticlePhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
