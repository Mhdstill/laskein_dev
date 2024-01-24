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
import { AddressGateway } from './address.gateway';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private prismaHelperService: PrismaHelperService,
    private readonly addressGateway: AddressGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-address'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-address' avec le nameSpace address.
    `,
  })
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const response = await this.addressService.create(createAddressDto);
    await this.addressGateway.handleSyncListAdress();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.addressService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.addressService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-address'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-address' avec le nameSpace address.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const response = await this.addressService.update(id, updateAddressDto);
    await this.addressGateway.handleSyncListAdress();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-address'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-address' avec le nameSpace address.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.addressService.remove(id);
    await this.addressGateway.handleSyncListAdress();
    return response;
  }
}
