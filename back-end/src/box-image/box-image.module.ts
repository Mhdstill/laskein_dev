import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoxImageController } from './box-image.controller';
import { BoxImageGateway } from './box-image.gateway';
import { BoxImageService } from './box-image.service';

@Module({
  imports: [PrismaModule],
  controllers: [BoxImageController],
  providers: [BoxImageService, BoxImageGateway],
})
export class BoxImageModule {}
