import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReceiverService } from './receiver.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ReceiverService],
  exports: [ReceiverService],
})
export class ReceiverModule {}
