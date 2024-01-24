import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/shared/guards/admin/admin.guard';
import { BlacklistTokenGuard } from 'src/shared/guards/blacklist-token/blacklist-token.guard';
import { PrismaHelperService } from 'src/utils/helper/prisma-helper/prisma-helper.service';
import { CreateNewsLetterDto } from './dto/create-news-letter.dto';
import { UpdateNewsLetterDto } from './dto/update-news-letter.dto';
import { NewsLetterGateway } from './news-letter.gateway';
import { NewsLetterService } from './news-letter.service';

@ApiTags('News-letter')
@Controller('news-letter')
export class NewsLetterController {
  constructor(
    private readonly newsLetterService: NewsLetterService,
    private prismaHelperService: PrismaHelperService,
    private readonly newsLetterGateway: NewsLetterGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-news-letter'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-news-letter' avec le nameSpace news-letter.
    `,
  })
  @Post()
  async create(@Body() createNewsLetterDto: CreateNewsLetterDto) {
    const response = await this.newsLetterService.create(createNewsLetterDto);
    await this.newsLetterGateway.handleSyncListNewsLetter();
    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.newsLetterService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.newsLetterService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-news-letter'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-news-letter' avec le nameSpace news-letter.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNewsLetterDto: UpdateNewsLetterDto,
  ) {
    const response = await this.newsLetterService.update(
      id,
      updateNewsLetterDto,
    );
    await this.newsLetterGateway.handleSyncListNewsLetter();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-news-letter'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-news-letter' avec le nameSpace news-letter.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.newsLetterService.remove(id);
    await this.newsLetterGateway.handleSyncListNewsLetter();
    return response;
  }
}
