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
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PriceGateway } from './price.gateway';
import { PriceService } from './price.service';

@ApiTags('Price')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('price')
export class PriceController {
  constructor(
    private readonly priceService: PriceService,
    private prismaHelperService: PrismaHelperService,
    private readonly priceGateway: PriceGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-price'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-price' avec le nameSpace price.
    `,
  })
  @Post()
  async create(@Body() createPriceDto: CreatePriceDto) {
    const response = await this.priceService.create(createPriceDto);
    await this.priceGateway.handleSyncListPrice();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.priceService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.priceService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-price'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-price' avec le nameSpace price.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdatePriceDto,
  ) {
    const response = await this.priceService.update(id, updatePriceDto);
    await this.priceGateway.handleSyncListPrice();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-price'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-price' avec le nameSpace price.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.priceService.remove(id);
    await this.priceGateway.handleSyncListPrice();
    return response;
  }
}
