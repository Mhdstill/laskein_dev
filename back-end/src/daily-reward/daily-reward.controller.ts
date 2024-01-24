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
import { DailyRewardGateway } from './daily-reward.gateway';
import { DailyRewardService } from './daily-reward.service';
import { CreateDailyRewardDto } from './dto/create-daily-reward.dto';
import { UpdateDailyRewardDto } from './dto/update-daily-reward.dto';

@ApiTags('Daily-reward')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('daily-reward')
export class DailyRewardController {
  constructor(
    private readonly dailyRewardService: DailyRewardService,
    private prismaHelperService: PrismaHelperService,
    private readonly dailyRewardGeteway: DailyRewardGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-daily-reward'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-daily-reward' avec le nameSpace daily-reward.
    `,
  })
  @Post()
  async create(@Body() createDailyRewardDto: CreateDailyRewardDto) {
    const respone = await this.dailyRewardService.create(createDailyRewardDto);
    await this.dailyRewardGeteway.handleSyncListDailyReward();
    return respone;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.dailyRewardService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.dailyRewardService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-daily-reward'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-daily-reward' avec le nameSpace daily-reward.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDailyRewardDto: UpdateDailyRewardDto,
  ) {
    const response = await this.dailyRewardService.update(
      id,
      updateDailyRewardDto,
    );
    await this.dailyRewardGeteway.handleSyncListDailyReward();
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.dailyRewardService.remove(id);
    await this.dailyRewardGeteway.handleSyncListDailyReward();
    return response;
  }
}
