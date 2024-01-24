import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoxTypeController } from './box-type.controller';
import { BoxTypeGateway } from './box-type.gateway';
import { BoxTypeService } from './box-type.service';

@Module({
  imports: [PrismaModule],
  controllers: [BoxTypeController],
  providers: [BoxTypeService, BoxTypeGateway],
})
export class BoxTypeModule {}
