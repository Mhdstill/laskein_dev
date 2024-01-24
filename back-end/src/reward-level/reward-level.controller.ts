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
import { CreateRewardLevelDto } from './dto/create-reward-level.dto';
import { UpdateRewardLevelDto } from './dto/update-reward-level.dto';
import { RewardLevelGateway } from './reward-level.gateway';
import { RewardLevelService } from './reward-level.service';

@ApiTags('Reward-level')
@Controller('reward-level')
export class RewardLevelController {
  constructor(
    private readonly rewardLevelService: RewardLevelService,
    private prismaHelperService: PrismaHelperService,
    private readonly rewardLevelGeteway: RewardLevelGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-reward-level'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-reward-level' avec le nameSpace reward-level.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createRewardLevelDto: CreateRewardLevelDto) {
    const respone = await this.rewardLevelService.create(createRewardLevelDto);
    await this.rewardLevelGeteway.handleSyncListRewardLevel();
    return respone;
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.rewardLevelService.findAll(
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
    return await this.rewardLevelService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-reward-level'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-reward-level' avec le nameSpace reward-level.
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
    @Body() updateRewardLevelDto: UpdateRewardLevelDto,
  ) {
    const response = await this.rewardLevelService.update(
      id,
      updateRewardLevelDto,
    );
    await this.rewardLevelGeteway.handleSyncListRewardLevel();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-reward-level'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-reward-level' avec le nameSpace reward-level.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.rewardLevelService.remove(id);
    await this.rewardLevelGeteway.handleSyncListRewardLevel();
    return response;
  }
}
