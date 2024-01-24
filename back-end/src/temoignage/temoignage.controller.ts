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
import { CreateTemoignageDto } from './dto/create-temoignage.dto';
import { UpdateTemoignageDto } from './dto/update-temoignage.dto';
import { TemoignageGateway } from './temoignage.gateway';
import { TemoignageService } from './temoignage.service';

@ApiTags('Temoignage')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('temoignage')
export class TemoignageController {
  constructor(
    private readonly temoignageService: TemoignageService,
    private prismaHelperService: PrismaHelperService,
    private readonly temoignageGateway: TemoignageGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-temoignage'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-temoignage' avec le nameSpace temoignage.
    `,
  })
  @Post()
  async create(@Body() createTemoignageDto: CreateTemoignageDto) {
    const response = await this.temoignageService.create(createTemoignageDto);
    await this.temoignageGateway.handleSyncListTemoignage();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.temoignageService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.temoignageService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-temoignage'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-temoignage' avec le nameSpace temoignage.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTemoignageDto: UpdateTemoignageDto,
  ) {
    const response = await this.temoignageService.update(
      id,
      updateTemoignageDto,
    );
    await this.temoignageGateway.handleSyncListTemoignage();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-temoignage'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-temoignage' avec le nameSpace temoignage.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.temoignageService.remove(id);
    await this.temoignageGateway.handleSyncListTemoignage();
    return response;
  }
}
