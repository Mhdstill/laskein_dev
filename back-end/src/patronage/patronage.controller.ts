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
import { CreatePatronageDto } from './dto/create-patronage.dto';
import { UpdatePatronageDto } from './dto/update-patronage.dto';
import { PatronageGateway } from './patronage.gateway';
import { PatronageService } from './patronage.service';

@ApiTags('Patronage')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('patronage')
export class PatronageController {
  constructor(
    private readonly patronageService: PatronageService,
    private prismaHelperService: PrismaHelperService,
    private readonly patronageGateway: PatronageGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-patronage'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-patronage' avec le nameSpace patronage.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createPatronageDto: CreatePatronageDto) {
    const response = await this.patronageService.create(createPatronageDto);
    await this.patronageGateway.handleSyncListPatronage();
    return response;
  }

  @Get('my-sponsored')
  @ApiQuery({ name: 'args', required: false })
  async findAllMySponsored(@Request() req, @Query('args') prismaArgs: string) {
    return await this.patronageService.findAllMySponsored(
      req.user,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get('my-total-expense')
  async findAllMyTotalExpense(@Request() req) {
    return await this.patronageService.findMyTotalExpense(req.user.id);
  }

  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.patronageService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.patronageService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-patronage'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-patronage' avec le nameSpace patronage.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatronageDto: UpdatePatronageDto,
  ) {
    const response = await this.patronageService.update(id, updatePatronageDto);
    await this.patronageGateway.handleSyncListPatronage();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-patronage'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-patronage' avec le nameSpace patronage.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.patronageService.remove(id);
    await this.patronageGateway.handleSyncListPatronage();
    return response;
  }
}
