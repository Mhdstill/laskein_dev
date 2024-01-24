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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/shared/guards/admin/admin.guard';
import { BlacklistTokenGuard } from 'src/shared/guards/blacklist-token/blacklist-token.guard';
import { PrismaHelperService } from 'src/utils/helper/prisma-helper/prisma-helper.service';
import { CreateOuterTransactionDto } from './dto/create-outerTransaction.dto';
import { UpdateOuterTransactionDto } from './dto/update-outerTransaction.dto';
import { OuterTransactionService } from './outer-transaction.service';

@ApiTags('Outer transaction')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('outer-transaction')
export class OuterTransactionController {
  constructor(
    private readonly outerTransactionService: OuterTransactionService,
    private prismaHelperService: PrismaHelperService, // private readonly transactionGateway: TransactionGateway,
  ) {}

  @Post('/deposit')
  async createDeposit(
    @Body() createOuterTransactionDto: CreateOuterTransactionDto,
  ) {
    const response = await this.outerTransactionService.createDeposit(
      createOuterTransactionDto,
    );
    // await this.transactionGateway.handleSyncListTransaction();
    return response;
  }

  @Post('/withdraw')
  async createWithdraw(
    @Body() createOuterTransactionDto: CreateOuterTransactionDto,
  ) {
    const response = await this.outerTransactionService.createWithdraw(
      createOuterTransactionDto,
    );
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.outerTransactionService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.outerTransactionService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  // @UseGuards(AdminGuard)
  // @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOuterTransactionDto: UpdateOuterTransactionDto,
  ) {
    const response = await this.outerTransactionService.update(
      id,
      updateOuterTransactionDto,
    );
    //await this.transactionGateway.handleSyncListTransaction();
    return response;
  }

  //@UseGuards(AdminGuard)
  //@SetMetadata('isAdmin', true)
  @Patch('/confirm/:id')
  async confirm(@Param('id') id: string) {
    const response = await this.outerTransactionService.confirm(id);
    //await this.transactionGateway.handleSyncListTransaction();
    return response;
  }

  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.outerTransactionService.remove(id);
    //await this.transactionGateway.handleSyncListTransaction();
    return response;
  }
}
