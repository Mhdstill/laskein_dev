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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleGateway } from './role.gateway';
import { RoleService } from './role.service';

@ApiTags('Role')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@UseGuards(AdminGuard)
@SetMetadata('isAdmin', true)
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private prismaHelperService: PrismaHelperService,
    private readonly roleGateway: RoleGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-role'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-role' avec le nameSpace role.
    `,
  })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const response = await this.roleService.create(createRoleDto);
    await this.roleGateway.handleSyncListRole();
    return response;
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.roleService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.roleService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-role'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-role' avec le nameSpace role.
    `,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const response = await this.roleService.update(id, updateRoleDto);
    await this.roleGateway.handleSyncListRole();
    return response;
  }

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'sync-list-role'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'sync-list-role' avec le nameSpace role.
    `,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.roleService.remove(id);
    await this.roleGateway.handleSyncListRole();
    return response;
  }
}
