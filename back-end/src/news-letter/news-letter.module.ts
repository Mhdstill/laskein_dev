import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SendMailModule } from 'src/send-mail/send-mail.module';
import { NewsLetterController } from './news-letter.controller';
import { NewsLetterGateway } from './news-letter.gateway';
import { NewsLetterService } from './news-letter.service';

@Module({
  imports: [PrismaModule, SendMailModule],
  controllers: [NewsLetterController],
  providers: [NewsLetterService, NewsLetterGateway],
})
export class NewsLetterModule {}
