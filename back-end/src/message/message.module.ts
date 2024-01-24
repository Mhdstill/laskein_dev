import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageService } from './message.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
