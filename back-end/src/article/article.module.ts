import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArticleController } from './article.controller';
import { ArticleGateway } from './article.gateway';
import { ArticleService } from './article.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleGateway],
})
export class ArticleModule {}
