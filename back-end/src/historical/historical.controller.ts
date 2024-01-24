import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { CreateHistoricalDto } from './dto/create-historical.dto';
import { HistoricalGateway } from './historical.gateway';
import { HistoricalService } from './historical.service';

@ApiTags('Historical')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('historical')
export class HistoricalController {
  constructor(
    private readonly historicalService: HistoricalService,
    private prismaHelperService: PrismaHelperService,
    private readonly historicalGateway: HistoricalGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-historical'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-historical' avec le nameSpace historical.
    `,
  })
  @Post()
  async create(@Body() createHistoricalDto: CreateHistoricalDto) {
    const response = await this.historicalService.create(createHistoricalDto);
    await this.historicalGateway.handleSyncListHistorical();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.historicalService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.historicalService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-historical'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-historical' avec le nameSpace historical.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.historicalService.remove(id);
    await this.historicalGateway.handleSyncListHistorical();
    return response;
  }
}
