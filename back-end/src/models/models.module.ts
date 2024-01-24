import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ModelsController } from './models.controller';
import { ModelsGateway } from './models.gateway';
import { ModelsService } from './models.service';

@Module({
  imports: [PrismaModule],
  controllers: [ModelsController],
  providers: [ModelsService, ModelsGateway],
})
export class ModelsModule {}
