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
import { BoxRewardLevelGateway } from './box-reward-level.gateway';
import { BoxRewardLevelService } from './box-reward-level.service';
import { CreateBoxRewardLevelDto } from './dto/create-box-reward-level.dto';
import { UpdateBoxRewardLevelDto } from './dto/update-box-reward-level.dto';

@ApiTags('Box-reward-level')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('box-reward-level')
export class BoxRewardLevelController {
  constructor(
    private readonly boxRewardLevelService: BoxRewardLevelService,
    private prismaHelperService: PrismaHelperService,
    private readonly boxRewardLevelGeteway: BoxRewardLevelGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-reward-level'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-reward-level' avec le nameSpace daily-reward.
    `,
  })
  @Post()
  async create(@Body() createBoxRewardLevelDto: CreateBoxRewardLevelDto) {
    const respone = await this.boxRewardLevelService.create(
      createBoxRewardLevelDto,
    );
    await this.boxRewardLevelGeteway.handleSyncListBoxRewardLevel();
    return respone;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.boxRewardLevelService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.boxRewardLevelService.findOne(
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
    @Body() updateBoxRewardLevelDto: UpdateBoxRewardLevelDto,
  ) {
    const respone = await this.boxRewardLevelService.update(
      id,
      updateBoxRewardLevelDto,
    );
    await this.boxRewardLevelGeteway.handleSyncListBoxRewardLevel();
    return respone;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-daily-reward'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-daily-reward' avec le nameSpace daily-reward.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const respone = await this.boxRewardLevelService.remove(id);
    await this.boxRewardLevelGeteway.handleSyncListBoxRewardLevel();
    return respone;
  }
}
