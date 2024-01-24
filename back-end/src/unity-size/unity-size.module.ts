import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UnitySizeController } from './unity-size.controller';
import { UnitySizeGateway } from './unity-size.gateway';
import { UnitySizeService } from './unity-size.service';

@Module({
  imports: [PrismaModule],
  controllers: [UnitySizeController],
  providers: [UnitySizeService, UnitySizeGateway],
})
export class UnitySizeModule {}
