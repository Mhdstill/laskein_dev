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
import { ArticlePhotoGateway } from './article-photo.gateway';
import { ArticlePhotoService } from './article-photo.service';
import { CreateArticlePhotoDto } from './dto/create-article-photo.dto';
import { UpdateArticlePhotoDto } from './dto/update-article-photo.dto';

@ApiTags('Article-photo')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('article-photo')
export class ArticlePhotoController {
  constructor(
    private readonly articlePhotoService: ArticlePhotoService,
    private prismaHelperService: PrismaHelperService,
    private readonly articlePhotoGateway: ArticlePhotoGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-article-photo'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-article-photo' avec le nameSpace article-photo.
    `,
  })
  @Post()
  async create(@Body() createArticlePhotoDto: CreateArticlePhotoDto) {
    const response = await this.articlePhotoService.create(
      createArticlePhotoDto,
    );
    await this.articlePhotoGateway.handleSyncListArticlePhoto();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.articlePhotoService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.articlePhotoService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-article-photo'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-article-photo' avec le nameSpace article-photo.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticlePhotoDto: UpdateArticlePhotoDto,
  ) {
    const response = await this.articlePhotoService.update(
      id,
      updateArticlePhotoDto,
    );
    await this.articlePhotoGateway.handleSyncListArticlePhoto();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-article-photo'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-article-photo' avec le nameSpace article-photo.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.articlePhotoService.remove(id);
    await this.articlePhotoGateway.handleSyncListArticlePhoto();
    return response;
  }
}
