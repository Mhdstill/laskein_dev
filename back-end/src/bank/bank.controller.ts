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
import { BankGateway } from './bank.gateway';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@ApiTags('Bank')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('bank')
export class BankController {
  constructor(
    private readonly bankService: BankService,
    private prismaHelperService: PrismaHelperService,
    private readonly bankGateway: BankGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-bank'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-bank' avec le nameSpace bank.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createBankDto: CreateBankDto) {
    const response = await this.bankService.create(createBankDto);
    await this.bankGateway.handleSyncListBank();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.bankService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.bankService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-bank'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-bank' avec le nameSpace bank.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    const response = await this.bankService.update(id, updateBankDto);
    await this.bankGateway.handleSyncListBank();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-bank'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-bank' avec le nameSpace bank.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.bankService.remove(id);
    await this.bankGateway.handleSyncListBank();
    return response;
  }
}
