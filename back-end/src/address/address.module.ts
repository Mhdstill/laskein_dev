import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressController } from './address.controller';
import { AddressGateway } from './address.gateway';
import { AddressService } from './address.service';

@Module({
  imports: [PrismaModule],
  controllers: [AddressController],
  providers: [AddressService, AddressGateway],
})
export class AddressModule {}
