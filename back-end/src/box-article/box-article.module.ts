import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoxArticleController } from './box-article.controller';
import { BoxArticleGateway } from './box-article.gateway';
import { BoxArticleService } from './box-article.service';

@Module({
  imports: [PrismaModule],
  controllers: [BoxArticleController],
  providers: [BoxArticleService, BoxArticleGateway],
})
export class BoxArticleModule {}
