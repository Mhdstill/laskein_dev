import {
  Body,
  Controller,
  Get,
  Param,
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
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @ApiOperation({
    description: `
      Pour écouter les changements, souscrivez à l'événement WebSocket 'finished-game' et 'sync-list-game' avec le nameSpace game.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @Post()
  async create(@Request() req, @Body() createGameDto: CreateGameDto) {
    return await this.gameService.playGame(createGameDto, req.user);
  }

  @ApiOperation({
    description: `
      Pour écouter les changements, souscrivez à l'événement WebSocket 'finished-game-demo' et 'sync-list-game' avec le nameSpace game.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @Get('my-coin-bonus-draw')
  async createDemo(@Request() req) {
    return await this.gameService.playBonusDrawCoin(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseGuards(AdminGuard)
  @SetMetadata('isAdmin', true)
  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    return await this.gameService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return await this.gameService.findOne(
      id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @ApiOperation({
    description: `
      Pour écouter les changements, souscrivez à l'événement WebSocket 'finished-game' et 'sync-list-game' avec le nameSpace game.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @Get('bonus-draw-percentage/:idSponsored')
  async bonusDrawPercentage(
    @Request() req,
    @Param('idSponsored') idSponsored: string,
  ) {
    return await this.gameService.playBonusDrawPercentage(
      req.user.id,
      idSponsored,
    );
  }

  // @ApiOperation({
  //   description: `
  //     Pour écouter les changements, souscrivez à l'événement WebSocket 'finished-game' et 'sync-list-game' avec le nameSpace game.
  //   `,
  // })
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  // @UseGuards(BlacklistTokenGuard)
  // @Get('my-coin-draw')
  // async coinBonusDraw(@Request() req) {
  //   console.log(req);
  //   // return await this.gameService.playBonusDrawCoin(req.user.id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
  //   return this.gameService.update(id, updateGameDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.gameService.remove(id);
  // }
}
