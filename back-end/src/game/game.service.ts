import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Queue } from 'bull';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { BoxService } from 'src/box/box.service';
import { PatronageService } from 'src/patronage/patronage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserBoxService } from 'src/user-box/user-box.service';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateGameDto,
  EnumStatusGame,
  EnumTypeGame,
  EnumVersionGame,
} from './dto/create-game.dto';
import { GameGateway } from './game.gateway';

@Injectable()
export class GameService {
  constructor(
    private prismaService: PrismaService,
    private readonly userBoxService: UserBoxService,
    private readonly boxService: BoxService,
    private readonly gameGateway: GameGateway,
    @InjectQueue('game') private readonly gameQueue: Queue,
    private readonly patronageService: PatronageService,
  ) {}

  async playGame(createGameDto: CreateGameDto, user: ReqUserDto) {
    try {
      const userBox = await this.userBoxService.checkIfBoxBelongsToUser(
        user.id,
        createGameDto.userBoxId,
      );

      if (!userBox) {
        return 'Impossible de jouer avec cette box';
      }
      const game = await this.prismaService.game.create({
        data: {
          reference: uuidv4(),
          startDate: new Date(),
          type: EnumTypeGame.BOX,
          userBoxId: createGameDto.userBoxId,
          status: EnumStatusGame.RUNNING,
          version: EnumVersionGame.FULL,
        },
      });
      await this.userBoxService.update(userBox.id, {
        isPlayed: true,
      });
      const box: any = await this.boxService.findOne(userBox.boxId, {
        select: {
          boxArticle: {
            select: {
              article: {
                select: {
                  price: {
                    select: {
                      currentPrice: true,
                    },
                  },
                },
              },
              articleId: true,
              winningChance: true,
            },
          },
        },
      });
      this.gameQueue.add('selectRandomArticle', box.boxArticle, {
        jobId: game.id,
      });
      return game;
    } catch (error) {
      throw error;
    }
  }

  async playBonusDrawPercentage(parentId: string, sponsoredId: string) {
    try {
      const patronnage = await this.patronageService.chefIfIsMySponsored(
        parentId,
        sponsoredId,
      );
      if (patronnage.length != 1) {
        return {
          msg: "Il est impossible de jouer. Cet utilisateur n'est pas votre filleul, ou ce jeu a déjà été joué.",
        };
      }

      const totalExpense = await this.patronageService.findMyTotalExpense(
        sponsoredId,
      );
      if (totalExpense < 50) {
        return {
          msg: 'Il est impossible de jouer, votre filleul doit depenser au moins 50 €.',
        };
      }

      const game = await this.prismaService.game.create({
        data: {
          reference: uuidv4(),
          startDate: new Date(),
          type: EnumTypeGame.PARENT,
          patronageId: patronnage[0].id,
          status: EnumStatusGame.RUNNING,
          version: EnumVersionGame.FULL,
        },
      });
      this.gameQueue.add('selectRandomPercentage', {
        jobId: game.id,
      });
      return game;
    } catch (error) {
      throw error;
    }
  }

  async playBonusDrawCoin(userId: string) {
    try {
      const patronnage = await this.patronageService.checkIfIsMyDrawIsAvailable(
        userId,
      );
      if (patronnage.length != 1) {
        return {
          msg: 'Il est impossible de jouer, ou ce jeu a déjà été joué.',
        };
      }
      const totalExpense = await this.patronageService.findMyTotalExpense(
        userId,
      );
      if (totalExpense < 50) {
        return {
          msg: 'Il est impossible de jouer, vous devez depenser au moins 50 €.',
        };
      }
      const game = await this.prismaService.game.create({
        data: {
          reference: uuidv4(),
          startDate: new Date(),
          type: EnumTypeGame.SPONSORED,
          patronageId: patronnage[0].id,
          status: EnumStatusGame.RUNNING,
          version: EnumVersionGame.FULL,
        },
      });
      this.gameQueue.add('selectRandomCoin', {
        jobId: game.id,
        userId: userId,
      });
      return game;
    } catch (error) {
      throw error;
    }
  }

  async playDemo(createGameDto: CreateGameDto) {
    try {
      const game = await this.prismaService.game.create({
        data: {
          reference: uuidv4(),
          startDate: new Date(),
          userBoxId: createGameDto.userBoxId,
          type: EnumTypeGame.BOX,
          status: EnumStatusGame.RUNNING,
          version: EnumVersionGame.DEMO,
        },
      });
      const box: any = await this.boxService.findOne(createGameDto.userBoxId, {
        select: {
          article: {
            select: {
              id: true,
              winningChance: true,
            },
          },
        },
      });
      // if (box.article.length <= 1) {
      //   return 'Impossible de jouer avec cette box';
      // }
      this.gameQueue.add('selectRandomArticleDemo', box.article, {
        jobId: game.id,
      });
      return game;
    } catch (error) {
      throw error;
    }
  }

  async selectRandomPercentage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const min = 1;
        const max = 8;

        // Génère un nombre aléatoire entre 0 et 1
        const randomValue = Math.random();

        // Définir les probabilités ici. Plus le nombre est petit, plus la probabilité est élevée.
        const probabilities = [0.2, 0.2, 0.15, 0.1, 0.1, 0.1, 0.05, 0.05];

        // Calculer la somme des probabilités
        const totalProbability = probabilities.reduce(
          (acc, prob) => acc + prob,
          0,
        );

        // Calculer la probabilité cumulative
        let cumulativeProbability = 0;
        for (let i = min; i <= max; i++) {
          cumulativeProbability += probabilities[i - 1] / totalProbability;
          if (randomValue <= cumulativeProbability) {
            resolve(i);
            return;
          }
        }

        // Si par hasard, la boucle se termine sans renvoyer de nombre, retournez max (c'est une sauvegarde)
        resolve(max);
      }, 15000);
    });
  }

  async selectRandomCoin() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        // Calculer la somme des éléments de l'array
        const totalSum = array.reduce((sum, num) => sum + num, 0);

        // Génère un nombre aléatoire entre 0 et 1
        const randomValue = Math.random();

        // Calculer les probabilités en fonction de la taille des nombres
        const probabilities = array.map((num) => num / totalSum);

        // Calculer la probabilité cumulative
        let cumulativeProbability = 0;
        for (let i = 0; i < array.length; i++) {
          cumulativeProbability += probabilities[i];
          if (randomValue <= cumulativeProbability) {
            resolve(array[i]);
            return;
          }
        }

        // Si par hasard, la boucle se termine sans renvoyer de nombre, retournez le dernier élément (c'est une sauvegarde)
        resolve(array[array.length - 1]);
      }, 15000);
    });
  }

  async selectRandomArticle(articleList: any[]) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalChances = articleList.reduce(
          (sum, item) => sum + item.winningChance,
          0,
        );
        const randomNum = Math.random() * totalChances;
        let cumulativeChance = 0;

        for (const item of articleList) {
          cumulativeChance += item.winningChance;
          if (randomNum <= cumulativeChance) {
            resolve(item);
            return;
          }
        }

        resolve(null);
      }, 15000);
    });
  }

  async findAll(prismaArgs: Prisma.GameArgs = {}) {
    try {
      const game = await this.prismaService.game.findMany({
        ...prismaArgs,
      });
      return game;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.GameArgs = {}) {
    try {
      const game = await this.prismaService.game.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!game) {
        throw new NotFoundException(`game with id ${id} not found`);
      }
      return game;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `Provided hex string ${id} representation must be exactly 12 bytes`,
          );
        }
        throw error;
      }
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(id: string, updateGameDto: Prisma.GameUncheckedUpdateManyInput) {
    const game = await this.findOne(id);
    try {
      const updatedGame = await this.prismaService.game.update({
        where: { id: game.id },
        data: updateGameDto,
      });
      await this.gameGateway.handleSyncListGame();
      return updatedGame;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const game = await this.findOne(id);
    return this.prismaService.game.delete({ where: { id: game.id } });
  }

  async calculatPercentageParent(price: number, percentage: number) {
    try {
      if (percentage < 0 || percentage > 100) {
        throw new Error('Le pourcentage doit être compris entre 0 et 100.');
      }

      const calculatedPrice = (percentage / 100) * price;

      return calculatedPrice;
    } catch (error) {
      throw error;
    }
  }
}
