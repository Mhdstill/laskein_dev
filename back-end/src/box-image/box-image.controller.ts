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
import { BoxImageGateway } from './box-image.gateway';
import { BoxImageService } from './box-image.service';
import { CreateBoxImageDto } from './dto/create-box-image.dto';
import { UpdateBoxImageDto } from './dto/update-box-image.dto';

@ApiTags('Box-image')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('box-image')
export class BoxImageController {
  constructor(
    private readonly boxImageService: BoxImageService,
    private prismaHelperService: PrismaHelperService,
    private readonly boxImageGateway: BoxImageGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-image'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-image' avec le nameSpace box-image.
    `,
  })
  @Post()
  async create(@Body() createBoxImageDto: CreateBoxImageDto) {
    const response = await this.boxImageService.create(createBoxImageDto);
    await this.boxImageGateway.handleSyncListBoxImage();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.boxImageService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.boxImageService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-image'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-image' avec le nameSpace box-image.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoxImageDto: UpdateBoxImageDto,
  ) {
    const response = await this.boxImageService.update(id, updateBoxImageDto);
    await this.boxImageGateway.handleSyncListBoxImage();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-image'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-image' avec le nameSpace box-image.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.boxImageService.remove(id);
    await this.boxImageGateway.handleSyncListBoxImage();
    return response;
  }
}
