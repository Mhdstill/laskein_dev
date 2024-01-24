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
import { BoxParamsGateway } from './box-params.gateway';
import { BoxParamsService } from './box-params.service';
import { CreateBoxParamDto } from './dto/create-box-param.dto';
import { UpdateBoxParamDto } from './dto/update-box-param.dto';

@ApiTags('Box-params')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('box-params')
export class BoxParamsController {
  constructor(
    private readonly boxParamsService: BoxParamsService,
    private prismaHelperService: PrismaHelperService,
    private readonly boxParamsGateway: BoxParamsGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-params'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-params' avec le nameSpace box-params.
    `,
  })
  @Post()
  async create(@Body() createBoxParamDto: CreateBoxParamDto) {
    const response = await this.boxParamsService.create(createBoxParamDto);
    await this.boxParamsGateway.handleSyncListBoxParams();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.boxParamsService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.boxParamsService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-params'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-params' avec le nameSpace box-params.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoxParamDto: UpdateBoxParamDto,
  ) {
    const response = await this.boxParamsService.update(id, updateBoxParamDto);
    await this.boxParamsGateway.handleSyncListBoxParams();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-params'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-params' avec le nameSpace box-params.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.boxParamsService.remove(id);
    await this.boxParamsGateway.handleSyncListBoxParams();
    return response;
  }
}
