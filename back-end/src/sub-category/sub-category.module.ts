import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryGateway } from './sub-category.gateway';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryGateway],
})
export class SubCategoryModule {}
