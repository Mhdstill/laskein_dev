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
import { CreateUserBoxDto } from './dto/create-user-box.dto';
import { UpdateUserBoxDto } from './dto/update-user-box.dto';
import { UserBoxGateway } from './user-box.gateway';
import { UserBoxService } from './user-box.service';

@ApiTags('User-box')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('user-box')
export class UserBoxController {
  constructor(
    private readonly userBoxService: UserBoxService,
    private prismaHelperService: PrismaHelperService,
    private readonly userBoxGateway: UserBoxGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-user-box'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-user-box' avec le nameSpace user-box.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createUserBoxDto: CreateUserBoxDto) {
    const response = await this.userBoxService.create(createUserBoxDto);
    await this.userBoxGateway.handleSyncListUserBox();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.userBoxService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.userBoxService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-user-box'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-user-box' avec le nameSpace user-box.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserBoxDto: UpdateUserBoxDto,
  ) {
    const response = await this.userBoxService.update(id, updateUserBoxDto);
    await this.userBoxGateway.handleSyncListUserBox();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-user-box'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-user-box' avec le nameSpace user-box.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.userBoxService.remove(id);
    await this.userBoxGateway.handleSyncListUserBox();
    return response;
  }
}
