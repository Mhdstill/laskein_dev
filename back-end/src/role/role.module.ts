import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleController } from './role.controller';
import { RoleGateway } from './role.gateway';
import { RoleService } from './role.service';

@Module({
  imports: [PrismaModule],
  providers: [RoleService, RoleGateway],
  controllers: [RoleController],
})
export class RoleModule {}
