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
import { Prisma } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/shared/guards/admin/admin.guard';
import { BlacklistTokenGuard } from 'src/shared/guards/blacklist-token/blacklist-token.guard';
import { WriteHistoryGuard } from 'src/shared/guards/write-history/write-history.guard';
// import { ResponseInterceptor } from 'src/shared/interceptor/response.interceptor';
import { PrismaHelperService } from 'src/utils/helper/prisma-helper/prisma-helper.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGateway } from './user.gateway';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(WriteHistoryGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(JwtGuard)
// @UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prismaHelperService: PrismaHelperService,
    private readonly userGateway: UserGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-user'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-user' avec le nameSpace user.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createAdmin(
      <Prisma.UserCreateInput>createUserDto,
    );
    await this.userGateway.handleSyncListUser();
    return createdUser;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    const users = await this.userService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
    return users;
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    const user = await this.userService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
    return user;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-user'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-user' avec le nameSpace user.
    `,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const udpatedUser = await this.userService.update(id, updateUserDto);
    await this.userGateway.handleSyncListUser();
    return udpatedUser;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-user'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-user' avec le nameSpace user.
    `,
  })
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.userService.remove(id);
    await this.userGateway.handleSyncListUser();
    return response;
  }
}
