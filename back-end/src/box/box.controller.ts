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
import { BoxGateway } from './box.gateway';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { PurchaseBoxDto } from './dto/purchase-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@ApiTags('Box')
@Controller('box')
export class BoxController {
  constructor(
    private readonly boxService: BoxService,
    private prismaHelperService: PrismaHelperService,
    private readonly boxGateway: BoxGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box' avec le nameSpace box.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createBoxDto: CreateBoxDto) {
    const response = await this.boxService.create(createBoxDto);
    await this.boxGateway.handleSyncListBox();
    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @Post('/purchase')
  async purchase(@Request() req, @Body() purchaseBoxDto: PurchaseBoxDto) {
    const response = await this.boxService.purchase(purchaseBoxDto, req.user);
    // // await this.boxGateway.handleSyncListBox();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.boxService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.boxService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box' avec le nameSpace box.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
    const response = await this.boxService.update(id, updateBoxDto);
    await this.boxGateway.handleSyncListBox();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box' avec le nameSpace box.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.boxService.remove(id);
    await this.boxGateway.handleSyncListBox();
    return response;
  }
}
