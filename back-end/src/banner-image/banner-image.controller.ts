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
import { BannerImageGateway } from './banner-image.gateway';
import { BannerImageService } from './banner-image.service';
import { CreateBannerImageDto } from './dto/create-banner-image.dto';
import { UpdateBannerImageDto } from './dto/update-banner-image.dto';

@ApiTags('Banner-image')
@Controller('banner-image')
export class BannerImageController {
  constructor(
    private readonly bannerImageService: BannerImageService,
    private prismaHelperService: PrismaHelperService,
    private readonly bannerGateway: BannerImageGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-banner-image'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-banner-image' avec le nameSpace banner-image.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createBannerImageDto: CreateBannerImageDto) {
    const response = await this.bannerImageService.create(createBannerImageDto);
    await this.bannerGateway.handleSyncListBannerImage();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.bannerImageService.findAll(
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
    return await this.bannerImageService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-banner-image'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-banner-image' avec le nameSpace banner-image.
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
    @Body() updateBannerImageDto: UpdateBannerImageDto,
  ) {
    const response = await this.bannerImageService.update(
      id,
      updateBannerImageDto,
    );
    await this.bannerGateway.handleSyncListBannerImage();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-banner-image'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-banner-image' avec le nameSpace banner-image.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.bannerImageService.remove(id);
    await this.bannerGateway.handleSyncListBannerImage();
    return response;
  }
}
