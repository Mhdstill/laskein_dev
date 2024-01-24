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
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnumUserBoxType } from 'src/user-box/dto/create-user-box.dto';
import { UserBoxService } from 'src/user-box/user-box.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { PurchaseBoxDto } from './dto/purchase-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxService {
  constructor(
    private prismaService: PrismaService,
    private readonly walletService: WalletService,
    private readonly userBoxService: UserBoxService,
  ) {}

  async create(createBoxDto: CreateBoxDto) {
    try {
      const createdBox = await this.prismaService.box.create({
        data: {
          ...createBoxDto,
          boxParams: {
            create: {
              isBestSelling: false,
              isBigPrice: false,
              isNew: false,
              isRecommended: false,
              isSubsciptionBonus: false,
            },
          },
        },
      });
      return createdBox;
    } catch (error) {
      throw error;
    }
  }

  async purchase(purchaseBoxDto: PurchaseBoxDto, user: ReqUserDto) {
    try {
      /**
       * Step 1 find box price
       */
      const { price } = await this.findOne(purchaseBoxDto.boxId, {
        select: {
          price: true,
        },
      });

      /**
       * Step 2 find balance user
       */
      const balance = await this.walletService.findBalanceByUserId(user.id);

      /**
       * Step 3 check for insufficient balance
       */
      if (balance < price) {
        return {
          message: 'Your balance is insufficient',
        };
      } else {
        await this.walletService.subtractBalanceByUserId(
          user.id,
          price,
          purchaseBoxDto.boxId,
        );
        await this.userBoxService.create({
          boxId: purchaseBoxDto.boxId,
          type: EnumUserBoxType.PURCHASE,
          userId: user.id,
          isPlayed: false,
          isLocked: false,
        });
        return {
          message: 'Purchase box with succes',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BoxArgs = {}) {
    try {
      const boxs = await this.prismaService.box.findMany({
        ...prismaArgs,
      });
      return boxs;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BoxArgs = {}) {
    try {
      const box = await this.prismaService.box.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!box) {
        throw new NotFoundException(`box with id ${id} not found`);
      }
      return box;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `box hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateBoxDto: UpdateBoxDto) {
    const box = await this.findOne(id);
    try {
      const updatedBox = await this.prismaService.box.update({
        where: { id: box.id },
        data: updateBoxDto,
      });
      return updatedBox;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const box = await this.findOne(id);
    return this.prismaService.box.delete({ where: { id: box.id } });
  }

  async getRandomBoxes(count: number) {
    try {
      // Récupérez tous les documents de la collection "Box" depuis MongoDB
      const allBoxes = await this.prismaService.box.findMany();

      // Mélangez aléatoirement les documents
      const shuffledBoxes = this.shuffleArray(allBoxes);

      // Limitez le tableau mélangé au nombre de boîtes requis
      const randomBoxes = shuffledBoxes.slice(0, count);

      return randomBoxes;
    } catch (error) {
      throw error;
    }
  }
  private shuffleArray(array: any[]) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
