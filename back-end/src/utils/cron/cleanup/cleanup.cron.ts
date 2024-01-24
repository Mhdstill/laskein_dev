import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CleanupCron {
  private readonly logger = new Logger(CleanupCron.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Cron('0 */4 * * *')
  async handleCronDeleteToken() {
    this.logger.debug('Token cleanup cron job started');
    try {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      await this.prismaService.tokenBlackList.deleteMany({
        where: {
          createdAt: {
            lt: oneHourAgo,
          },
        },
      });

      this.logger.debug('Token cleanup cron job completed successfully');
    } catch (error) {
      this.logger.error(`An error occurred during token cleanup: ${error}`);
    }
  }

  @Cron('0 */4 * * *')
  async handleCronDeleteCodeConfirmLogin() {
    this.logger.debug('CodeConfirmLogin cleanup cron job started');
    try {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      await this.prismaService.codeConfirmLogin.deleteMany({
        where: {
          createdAt: {
            lt: oneHourAgo,
          },
        },
      });

      this.logger.debug(
        'CodeConfirmLogin cleanup cron job completed successfully',
      );
    } catch (error) {
      this.logger.error(
        `An error occurred during CodeConfirmLogin cleanup: ${error}`,
      );
    }
  }

  @Cron('0 */4 * * *')
  async handleCronDeleteCodeConfirmMail() {
    this.logger.debug('CodeConfirmMail cleanup cron job started');
    try {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      await this.prismaService.codeConfirmMail.deleteMany({
        where: {
          createdAt: {
            lt: oneHourAgo,
          },
        },
      });

      this.logger.debug(
        'CodeConfirmMail cleanup cron job completed successfully',
      );
    } catch (error) {
      this.logger.error(
        `An error occurred during CodeConfirmMail cleanup: ${error}`,
      );
    }
  }
}
