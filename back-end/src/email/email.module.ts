import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
