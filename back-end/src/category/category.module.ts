import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryController } from './category.controller';
import { CategoryGateway } from './category.gateway';
import { CategoryService } from './category.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryGateway],
})
export class CategoryModule {}
