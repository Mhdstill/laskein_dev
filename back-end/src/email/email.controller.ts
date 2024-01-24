import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { BlacklistTokenGuard } from 'src/shared/guards/blacklist-token/blacklist-token.guard';
import { EmailService } from './email.service';

@ApiTags('imap')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('imap')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer les e-mails récents' })
  @ApiQuery({
    name: 'pageSize',
    description: 'Taille de la page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    description: 'Numéro de la page',
    required: false,
    type: Number,
  })
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    return this.emailService.findAll(page, pageSize);
  }
}
