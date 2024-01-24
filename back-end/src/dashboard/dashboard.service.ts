import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      const member = await this.prismaService.user.count({
        where: {
          isMember: true,
        },
      });
      const memberActive = await this.prismaService.user.count({
        where: {
          isMember: true,
          isActif: true,
        },
      });
      const memberEmailVerified = await this.prismaService.user.count({
        where: {
          isMember: true,
          emailIsVerified: true,
        },
      });
      const memberEmailNotVerified = await this.prismaService.user.count({
        where: {
          isMember: true,
          emailIsVerified: false,
        },
      });
      const memberNotActive = await this.prismaService.user.count({
        where: {
          isMember: true,
          isActif: false,
        },
      });

      const box = await this.prismaService.box.count();
      const article = await this.prismaService.article.count();

      return {
        member,
        memberActive,
        memberNotActive,
        memberEmailVerified,
        memberEmailNotVerified,
        box,
        article,
      };
    } catch (error) {
      throw error;
    }
  }
}
