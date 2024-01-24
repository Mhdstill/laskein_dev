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
import { CreateUnitySizeDto } from './dto/create-unity-size.dto';
import { UpdateUnitySizeDto } from './dto/update-unity-size.dto';
import { UnitySizeGateway } from './unity-size.gateway';
import { UnitySizeService } from './unity-size.service';

@ApiTags('Unity-size')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('unity-size')
export class UnitySizeController {
  constructor(
    private readonly unitySizeService: UnitySizeService,
    private prismaHelperService: PrismaHelperService,
    private readonly unitySizeGateway: UnitySizeGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-unity-size'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-unity-size' avec le nameSpace unity-size.
    `,
  })
  @Post()
  async create(@Body() createUnitySizeDto: CreateUnitySizeDto) {
    const response = await this.unitySizeService.create(createUnitySizeDto);
    await this.unitySizeGateway.handleSyncListUnitySize();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.unitySizeService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.unitySizeService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-unity-size'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-unity-size' avec le nameSpace unity-size.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitySizeDto: UpdateUnitySizeDto,
  ) {
    const response = await this.unitySizeService.update(id, updateUnitySizeDto);
    await this.unitySizeGateway.handleSyncListUnitySize();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-unity-size'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-unity-size' avec le nameSpace unity-size.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.unitySizeService.remove(id);
    await this.unitySizeGateway.handleSyncListUnitySize();
    return response;
  }
}
