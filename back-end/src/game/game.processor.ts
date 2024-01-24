import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { EnumStatusGame, Prisma } from '@prisma/client';
import { Job } from 'bull';
import { EnumStatusPatronage } from 'src/patronage/dto/create-patronage.dto';
import { PatronageService } from 'src/patronage/patronage.service';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';
import { WalletService } from 'src/wallet/wallet.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Processor('game')
export class GameProcessor {
  constructor(
    private readonly gameService: GameService,
    private readonly gameGateway: GameGateway,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly patronageService: PatronageService,
    private readonly walletService: WalletService,
  ) {}
  private readonly logger = new Logger(GameProcessor.name);

  @Process('selectRandomArticle')
  async handleSelectRandomArticle(job: Job<Prisma.ArticleCreateManyInput[]>) {
    this.logger.debug('Start Game...');
    const game: any = await this.gameService.findOne(job.id.toString(), {
      select: {
        id: true,
        userBox: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    const boxArticle: any = await this.gameService.selectRandomArticle(
      job.data,
    );
    const patronage = await this.patronageService.checkifPSponsorIsApprouved(
      game.userBox.user.id,
    );
    if (patronage.length > 0) {
      const bonus = await this.gameService.calculatPercentageParent(
        boxArticle.article.price.currentPrice,
        patronage[0].gainPercentage,
      );
      await this.walletService.addBalanceByUserIdPatronage(
        patronage[0].userParentId,
        bonus,
      );
    }
    const gameUpdated = await this.gameService.update(game.id, {
      endDate: new Date(),
      status: EnumStatusGame.FINISHED,
      articleId: boxArticle.articleId,
    });
    await this.shoppingCartService.create({
      gameId: gameUpdated.id,
      winningDate: gameUpdated.endDate,
      userId: game.userBox.user.id,
    });
    this.gameGateway.finishedGame(gameUpdated);
    this.logger.debug('End Game');
  }

  @Process('selectRandomArticleDemo')
  async handleSelectRandomArticleDemo(
    job: Job<Prisma.ArticleCreateManyInput[]>,
  ) {
    this.logger.debug('Start Demo Game...');
    const game: any = await this.gameService.findOne(job.id.toString(), {
      select: {
        id: true,
      },
    });
    const article: any = await this.gameService.selectRandomArticle(job.data);
    const gameUpdated = await this.gameService.update(game.id, {
      endDate: new Date(),
      status: EnumStatusGame.FINISHED,
      articleId: article.id,
    });
    await this.gameGateway.handleSyncListGame();
    await this.gameGateway.finishedGameDemo(gameUpdated);
    this.logger.debug('End Demo Game');
  }

  @Process('selectRandomPercentage')
  async handleSelectRandomPercentage(job: Job) {
    this.logger.debug('Start Game...');
    const game = await this.gameService.findOne(job.data.jobId);
    const percentage = await this.gameService.selectRandomPercentage();
    const gameUpdated = await this.gameService.update(game.id, {
      endDate: new Date(),
      status: EnumStatusGame.FINISHED,
      gainPercentage: percentage,
    });
    // const today = new Date(); // Obtenez la date actuelle
    // const bonusEndDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const bonusEndDate = new Date();
    bonusEndDate.setDate(bonusEndDate.getDate() + 60);
    await this.patronageService.update(game.patronageId, {
      gainPercentage: percentage,
      status: EnumStatusPatronage.APPROVED,
      bonusEndDate: bonusEndDate,
    });
    this.gameGateway.finishedGameBonusDrawPercentage(gameUpdated);
    this.logger.debug('End Game');
  }

  @Process('selectRandomCoin')
  async handleSelectRandomCoin(job: Job) {
    this.logger.debug('Start Game...');
    const game = await this.gameService.findOne(job.data.jobId);
    const coin: any = await this.gameService.selectRandomCoin();
    const gameUpdated = await this.gameService.update(game.id, {
      endDate: new Date(),
      status: EnumStatusGame.FINISHED,
      gainDraw: coin,
    });
    await this.patronageService.update(game.patronageId, {
      bonusCollect: true,
    });
    await this.walletService.addBalanceByUserIdDraw(
      job.data.userId,
      coin,
      game.id,
    );
    this.gameGateway.finishedGameMyCoinBonusDraw(gameUpdated);
    this.logger.debug('End Game');
  }
}
