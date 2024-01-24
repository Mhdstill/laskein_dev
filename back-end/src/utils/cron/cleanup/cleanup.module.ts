import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CleanupCron } from './cleanup.cron';

@Module({
  imports: [PrismaModule],
  providers: [CleanupCron],
})
export class CleanupModule {}
