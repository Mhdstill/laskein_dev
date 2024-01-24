import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
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
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';

@ApiTags('Subscription')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private prismaHelperService: PrismaHelperService,
    private readonly subscriptionGateway: SubscriptionGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-subscription'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-subscription' avec le nameSpace subscription.
    `,
  })
  @Post()
  async create(
    @Request() req,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const response = await this.subscriptionService.create(
      createSubscriptionDto,
      req.user,
    );
    await this.subscriptionGateway.handleSyncListSubscription();
    return response;
  }

  @Get('my-subscription')
  @ApiQuery({ name: 'args', required: false })
  async findMySubscription(@Request() req, @Query('args') prismaArgs: string) {
    return await this.subscriptionService.findMySubscription(
      req.user,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-subscription'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-subscription' avec le nameSpace subscription.
    `,
  })
  @Patch('update-my-subscription')
  async updateMySubscription(
    @Request() req,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    const response = await this.subscriptionService.updateMySubscription(
      req.user,
      updateSubscriptionDto,
    );
    await this.subscriptionGateway.handleSyncListSubscription();
    return response;
  }

  /**
   * Admin APi
   */

  @Get()
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.subscriptionService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.subscriptionService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-subscription'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-subscription' avec le nameSpace subscription.
    `,
  })
  // @UseGuards(AdminGuard)
  // @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    const response = await this.subscriptionService.update(
      id,
      updateSubscriptionDto,
    );
    await this.subscriptionGateway.handleSyncListSubscription();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-subscription'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-subscription' avec le nameSpace subscription.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.subscriptionService.remove(id);
    await this.subscriptionGateway.handleSyncListSubscription();
    return response;
  }
}
