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
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferGateway } from './offer.gateway';
import { OfferService } from './offer.service';

@ApiTags('Offer')
@Controller('offer')
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
    private prismaHelperService: PrismaHelperService,
    private readonly offerGateway: OfferGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-offer'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-offer' avec le nameSpace offer.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto) {
    const response = await this.offerService.create(createOfferDto);
    await this.offerGateway.handleSyncListOffer();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.offerService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.offerService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-offer'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-offer' avec le nameSpace offer.
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
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    const response = await this.offerService.update(id, updateOfferDto);
    await this.offerGateway.handleSyncListOffer();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-offer'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-offer' avec le nameSpace offer.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.offerService.remove(id);
    await this.offerGateway.handleSyncListOffer();
    return response;
  }
}
