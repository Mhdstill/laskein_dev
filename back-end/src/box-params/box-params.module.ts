import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoxParamsController } from './box-params.controller';
import { BoxParamsGateway } from './box-params.gateway';
import { BoxParamsService } from './box-params.service';

@Module({
  imports: [PrismaModule],
  controllers: [BoxParamsController],
  providers: [BoxParamsService, BoxParamsGateway],
})
export class BoxParamsModule {}
