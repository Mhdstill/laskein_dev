import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserBoxService } from 'src/user-box/user-box.service';

@Injectable()
export class RewardCron {
  private readonly logger = new Logger(RewardCron.name);

  constructor(private userBoxService: UserBoxService) {}

  @Cron('0 0 * * *')
  async handleCronActivateOrDeactivateUserBoxes() {
    this.logger.debug('ActivateOrDeactivateUserBoxes cron job started');
    await this.userBoxService.activateOrDeactivateUserBoxesAllUsers();
    this.logger.debug(
      'ActivateOrDeactivateUserBoxes cron job completed successfully',
    );
  }
}
