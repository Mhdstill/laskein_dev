import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProviderController } from './provider.controller';
import { ProviderGateway } from './provider.gateway';
import { ProviderService } from './provider.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProviderController],
  providers: [ProviderService, ProviderGateway],
})
export class ProviderModule {}
