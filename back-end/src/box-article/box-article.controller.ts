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
import { BoxArticleGateway } from './box-article.gateway';
import { BoxArticleService } from './box-article.service';
import { CreateBoxArticleDto } from './dto/create-box-article.dto';
import { UpdateBoxArticleDto } from './dto/update-box-article.dto';

@ApiTags('Box-article')
@Controller('box-article')
export class BoxArticleController {
  constructor(
    private readonly boxArticleService: BoxArticleService,
    private prismaHelperService: PrismaHelperService,
    private readonly boxArticleGateway: BoxArticleGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-article'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-article' avec le nameSpace box-article.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createBoxArticleDto: CreateBoxArticleDto) {
    const response = await this.boxArticleService.create(createBoxArticleDto);
    await this.boxArticleGateway.handleSyncListBoxArticle();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.boxArticleService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.boxArticleService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-article'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-article' avec le nameSpace box-article.
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
    @Body() updateBoxArticleDto: UpdateBoxArticleDto,
  ) {
    const response = await this.boxArticleService.update(
      id,
      updateBoxArticleDto,
    );
    await this.boxArticleGateway.handleSyncListBoxArticle();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-article'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-article' avec le nameSpace box-article.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.boxArticleService.remove(id);
    await this.boxArticleGateway.handleSyncListBoxArticle();
    return response;
  }
}
