import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemoignageController } from './temoignage.controller';
import { TemoignageGateway } from './temoignage.gateway';
import { TemoignageService } from './temoignage.service';

@Module({
  imports: [PrismaModule],
  controllers: [TemoignageController],
  providers: [TemoignageService, TemoignageGateway],
})
export class TemoignageModule {}
