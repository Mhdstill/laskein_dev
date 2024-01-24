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
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionGateway } from './permission.gateway';
import { PermissionService } from './permission.service';

@ApiTags('Permission')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private prismaHelperService: PrismaHelperService,
    private readonly permissionGateway: PermissionGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-permission'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-permission' avec le nameSpace permission.
    `,
  })
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    const response = await this.permissionService.create(createPermissionDto);
    await this.permissionGateway.handleSyncListPermission();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.permissionService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.permissionService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-permission'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-permission' avec le nameSpace permission.
    `,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const response = await this.permissionService.update(
      id,
      updatePermissionDto,
    );
    await this.permissionGateway.handleSyncListPermission();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-permission'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-permission' avec le nameSpace permission.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.permissionService.remove(id);
    await this.permissionGateway.handleSyncListPermission();
    return response;
  }
}
