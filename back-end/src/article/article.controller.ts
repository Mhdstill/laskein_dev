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
import { ArticleGateway } from './article.gateway';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Article')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private prismaHelperService: PrismaHelperService,
    private readonly articleGateway: ArticleGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-article'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-article' avec le nameSpace article.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    const response = await this.articleService.create(createArticleDto);
    await this.articleGateway.handleSyncListArticle();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.articleService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.articleService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-article'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-article' avec le nameSpace article.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const response = await this.articleService.update(id, updateArticleDto);
    await this.articleGateway.handleSyncListArticle();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-article'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-article' avec le nameSpace article.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.articleService.remove(id);
    await this.articleGateway.handleSyncListArticle();
    return response;
  }
}
