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
import { BoxTypeGateway } from './box-type.gateway';
import { BoxTypeService } from './box-type.service';
import { CreateBoxTypeDto } from './dto/create-box-type.dto';
import { UpdateBoxTypeDto } from './dto/update-box-type.dto';

@ApiTags('Box-type')
@Controller('box-type')
export class BoxTypeController {
  constructor(
    private readonly boxTypeService: BoxTypeService,
    private prismaHelperService: PrismaHelperService,
    private readonly boxTypeGateway: BoxTypeGateway,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-type'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-type' avec le nameSpace box-type.
    `,
  })
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createBoxTypeDto: CreateBoxTypeDto) {
    const response = await this.boxTypeService.create(createBoxTypeDto);
    await this.boxTypeGateway.handleSyncListBoxType();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.boxTypeService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.boxTypeService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-type'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-type' avec le nameSpace box-type.
    `,
  })
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoxTypeDto: UpdateBoxTypeDto,
  ) {
    const respone = await this.boxTypeService.update(id, updateBoxTypeDto);
    await this.boxTypeGateway.handleSyncListBoxType();
    return respone;
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-box-type'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-box-type' avec le nameSpace box-type.
    `,
  })
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.boxTypeService.remove(id);
    await this.boxTypeGateway.handleSyncListBoxType();
    return response;
  }
}
