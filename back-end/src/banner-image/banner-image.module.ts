import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BannerImageController } from './banner-image.controller';
import { BannerImageGateway } from './banner-image.gateway';
import { BannerImageService } from './banner-image.service';

@Module({
  imports: [PrismaModule],
  controllers: [BannerImageController],
  providers: [BannerImageService, BannerImageGateway],
})
export class BannerImageModule {}
