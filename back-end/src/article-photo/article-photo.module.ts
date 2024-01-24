import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArticlePhotoController } from './article-photo.controller';
import { ArticlePhotoGateway } from './article-photo.gateway';
import { ArticlePhotoService } from './article-photo.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArticlePhotoController],
  providers: [ArticlePhotoService, ArticlePhotoGateway],
})
export class ArticlePhotoModule {}
