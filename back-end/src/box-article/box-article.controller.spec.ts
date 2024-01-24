import { Test, TestingModule } from '@nestjs/testing';
import { BoxArticleController } from './box-article.controller';
import { BoxArticleService } from './box-article.service';

describe('BoxArticleController', () => {
  let controller: BoxArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxArticleController],
      providers: [BoxArticleService],
    }).compile();

    controller = module.get<BoxArticleController>(BoxArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
