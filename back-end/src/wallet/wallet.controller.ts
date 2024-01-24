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
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletGateway } from './wallet.gateway';
import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private prismaHelperService: PrismaHelperService,
    private readonly walletGateway: WalletGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-wallet'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-wallet' avec le nameSpace wallet.
    `,
  })
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    const response = await this.walletService.create(createWalletDto);
    await this.walletGateway.handleSyncListWallet();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.walletService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.walletService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-wallet'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-wallet' avec le nameSpace wallet.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    const response = await this.walletService.update(id, updateWalletDto);
    await this.walletGateway.handleSyncListWallet();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-wallet'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-wallet' avec le nameSpace wallet.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.walletService.remove(id);
    await this.walletGateway.handleSyncListWallet();
    return response;
  }
}
