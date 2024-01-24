import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostController } from './post.controller';
import { PostGateway } from './post.gateway';
import { PostService } from './post.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, PostGateway],
})
export class PostModule {}
