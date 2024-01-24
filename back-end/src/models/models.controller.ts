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
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelsGateway } from './models.gateway';
import { ModelsService } from './models.service';

@ApiTags('Models')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('models')
export class ModelsController {
  constructor(
    private readonly modelsService: ModelsService,
    private prismaHelperService: PrismaHelperService,
    private readonly modelsGateway: ModelsGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-models'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-models' avec le nameSpace models.
    `,
  })
  @Post()
  async create(@Body() createModelDto: CreateModelDto) {
    const response = await this.modelsService.create(createModelDto);
    await this.modelsGateway.handleSyncListModels();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.modelsService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.modelsService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-models'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-models' avec le nameSpace models.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModelDto: UpdateModelDto,
  ) {
    const response = await this.modelsService.update(id, updateModelDto);
    await this.modelsGateway.handleSyncListModels();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-models'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-models' avec le nameSpace models.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.modelsService.remove(id);
    await this.modelsGateway.handleSyncListModels();
    return response;
  }
}
