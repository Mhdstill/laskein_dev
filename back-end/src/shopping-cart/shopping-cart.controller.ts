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
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ExchangeShoppingCartDto } from './dto/exchange-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCartGateway } from './shopping-cart.gateway';
import { ShoppingCartService } from './shopping-cart.service';

@ApiTags('Shopping-cart')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private prismaHelperService: PrismaHelperService,
    private readonly shoppingCartGateway: ShoppingCartGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-shopping-cart'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-shopping-cart' avec le nameSpace shopping-cart.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    const response = await this.shoppingCartService.create(
      createShoppingCartDto,
    );
    // await this.shoppingCartGateway.handleSyncListShoppingCart();
    return response;
  }

  @Post('request-exchange')
  async createRequestExchange(
    @Request() req,
    @Body() exchangeShoppingCartDto: ExchangeShoppingCartDto,
  ) {
    const response = await this.shoppingCartService.exchange(
      req.user,
      exchangeShoppingCartDto,
    );
    await this.shoppingCartGateway.handleSyncListShoppingCart();
    return response;
  }

  @Post('request-delivery')
  async createRequestDelivery(
    @Request() req,
    @Body() exchangeShoppingCartDto: ExchangeShoppingCartDto,
  ) {
    const response = await this.shoppingCartService.delivery(
      req.user,
      exchangeShoppingCartDto,
    );
    await this.shoppingCartGateway.handleSyncListShoppingCart();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.shoppingCartService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.shoppingCartService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-shopping-cart'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-shopping-cart' avec le nameSpace shopping-cart.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    const response = await this.shoppingCartService.update(
      id,
      updateShoppingCartDto,
    );
    await this.shoppingCartGateway.handleSyncListShoppingCart();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-shopping-cart'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-shopping-cart' avec le nameSpace shopping-cart.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.shoppingCartService.remove(id);
    await this.shoppingCartGateway.handleSyncListShoppingCart();
    return response;
  }
}
