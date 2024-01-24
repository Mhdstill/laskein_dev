import { Module } from '@nestjs/common';
import { HistoricalService } from 'src/historical/historical.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserGateway } from './user.gateway';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, CreateUserDto, HistoricalService, UserGateway],
  exports: [UserService, CreateUserDto],
})
export class UserModule {}
