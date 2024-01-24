import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionController } from './permission.controller';
import { PermissionGateway } from './permission.gateway';
import { PermissionService } from './permission.service';

@Module({
  imports: [PrismaModule],
  providers: [PermissionService, PermissionGateway],
  controllers: [PermissionController],
})
export class PermissionModule {}
