import { Component, Input, OnInit } from '@angular/core';
import { CardBoxItem } from '../../../components/card-box/card-box.component';
import { environment } from 'src/environments/environment';
import {
  DailyService,
  UserBoxDTO,
} from 'src/app/services/rewardDaily/daily.service';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import 'moment-timezone';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-daily-reward',
  templateUrl: './daily-reward.component.html',
  styleUrls: ['./daily-reward.component.scss'],
})
export class DailyRewardComponent implements OnInit {
  constructor(
    private dailyRewardService: DailyService,
    private readonly store: Store,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private shoppingCartService: ShoppingCartService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  cardBoxItem: CardBoxItem = {
    title: 'box name',
    subTitle: 'pour homme',
    textLeft: 'Game',
    textRight: '50€',
  };

  cardDailyItem!: CardDailyItem;
  listUserBox: UserBoxDTO[] = [];
  UserBoxId: any;
  displayHeures: any;
  displayMins: any;
  displaySeconds: any;
  userTimezone: any;
  displayJour: any;
  formattedCardDailyItems: CardDailyItem[] = [];

  ngOnInit(): void {
    this.getAllDailyReward();
    this.getOneUserBox();
    this.getUser();

    this.dailyRewardService
      .getUserBox({ where: { userId: this.authService.getUserId() } })
      .subscribe(userBoxes => {
        const userBoxIsLockedFalse: UserBoxDTO[] = Object.values(
          userBoxes
        ).filter(userBoxes => userBoxes.isLocked === false);

        if (userBoxIsLockedFalse.length > 0) {
          const maxUserBox = userBoxIsLockedFalse.reduce<UserBoxDTO | null>(
            (maxBox, currentBox) => {
              if (
                !maxBox ||
                (currentBox.dayNumber !== undefined &&
                  (maxBox.dayNumber === undefined ||
                    currentBox.dayNumber > maxBox.dayNumber))
              ) {
                return currentBox;
              } else {
                return maxBox;
              }
            },
            null
          );
          // console.log('teste2', maxUserBox);
          if (maxUserBox && maxUserBox.dayNumber !== undefined) {
            const TagNum = maxUserBox.dayNumber;
            this.displayJour = `${TagNum}`;
          }
          if (maxUserBox?.deactivationDate) {
            this.userTimezone =
              Intl.DateTimeFormat().resolvedOptions().timeZone;
            moment.tz.setDefault(this.userTimezone);
            const deactivationDate = moment(maxUserBox.deactivationDate).tz(
              this.userTimezone
            );
            const currentDate = moment().tz(this.userTimezone);
            const AnswerTime = moment.duration(
              deactivationDate.diff(currentDate)
            );
            const nouvelleDate = AnswerTime.subtract(3, 'hours');
            const hours = nouvelleDate.hours();
            const minutes = AnswerTime.minutes();
            const seconds = AnswerTime.seconds();
            this.displayHeures = `${hours}`;
            this.displayMins = `${minutes}`;
            this.displaySeconds = `${seconds}`;
            this.timer(hours, minutes);
          }
        }
      });

    this.sharedDataService.getDailyReward().subscribe(data => {
      if (data !== null) {
        // refresh Recompense
        this.getAllDailyReward();
      }
    });
    this.sharedDataService.getUserBox().subscribe(data => {
      if (data !== null) {
        // refresh Recompense
        this.getAllDailyReward();
        this.getOneUserBox();
      }
    });
  }

  timer(hour: number, minute: number) {
    let totalSeconds: number = (hour * 60 + minute) * 60;

    const timer = setInterval(() => {
      const hours = Math.floor(totalSeconds / 3600);
      const remainingSeconds = totalSeconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      this.displayHeures = `${formattedHours}`;
      this.displayMins = `${formattedMinutes}`;
      this.displaySeconds = `${formattedSeconds}`;

      if (totalSeconds <= 0) {
        // console.log('finished');
        clearInterval(timer);
      }

      totalSeconds--;
    }, 1000);
  }

  getAllDailyReward() {
    this.dailyRewardService
      .getUserBox({
        include: {
          box: {
            include: {
              boxImage: true,
            },
          },
        },
        where: { userId: this.authService.getUserId() },
      })
      .subscribe(data => {
        this.listUserBox = data;
        this.getFormattedCardDailyItems();
      });
  }

  UserMe: any;

  getUser() {
    const userId = this.authService.getUserId();
    this.shoppingCartService
      .getUser(userId, {
        include: {
          address: true,
        },
      })
      .subscribe(response => {
        this.UserMe = response.emailIsVerified;
      });
  }

  goGame(): void {
    localStorage.removeItem('BoxArticle');
    localStorage.removeItem('GameId');
    if (this.UserMe === true) {
      this.dailyRewardService
        .getUserBox({
          where: { userId: this.authService.getUserId() },
          include: {
            box: {
              include: {
                boxImage: true,
              },
            },
          },
        })
        .subscribe(userBoxes => {
          const userBoxIsLockedFalse: UserBoxDTO[] = Object.values(
            userBoxes
          ).filter(
            userBoxes =>
              userBoxes.type === 'DAILY_REWARD' &&
              userBoxes.isLocked === false &&
              userBoxes.isPlayed === false
          );
          this.router.navigateByUrl(`/game/${userBoxIsLockedFalse[0]?.id}`);
        });
    } else {
      this.alertService.showAlert('ERROR', {
        header: 'Erreur',
        body: this.translate.instant('textNotifPourActiveCompte'),
      });
    }
  }

  getOneUserBox(): void {
    this.dailyRewardService
      .getUserBox({
        where: { userId: this.authService.getUserId() },
        include: {
          box: {
            include: {
              boxImage: true,
            },
          },
        },
      })
      .subscribe(userBoxes => {
        const userBoxIsLockedFalse: UserBoxDTO[] = Object.values(
          userBoxes
        ).filter(
          userBoxes =>
            userBoxes.type === 'DAILY_REWARD' && userBoxes.isLocked === false
        );
        if (userBoxIsLockedFalse.length > 0) {
          const maxUserBox = userBoxIsLockedFalse.reduce<UserBoxDTO | null>(
            (maxBox, currentBox) => {
              if (
                !maxBox ||
                (currentBox.dayNumber !== undefined &&
                  (maxBox.dayNumber === undefined ||
                    currentBox.dayNumber > maxBox.dayNumber))
              ) {
                return currentBox;
              } else {
                return maxBox;
              }
            },
            null
          );

          if (maxUserBox && maxUserBox.dayNumber !== undefined) {
            const TagNum = maxUserBox.dayNumber;
            this.displayJour = `${TagNum}`;
          }
        }
      });
  }

  getFormattedCardDailyItems(): void {
    this.formattedCardDailyItems = this.listUserBox.map(userB => ({
      title: userB.box?.name.substring(0, 10) + '. . .',
      nbrJour: String(userB.dayNumber),
      imageUrl: userB.box?.boxImage[0]?.photoUrl,
      id: userB.id,
      isLocked: String(userB.isLocked),
      isPlayed: String(userB.isPlayed),
      desactivDate: userB.deactivationDate,
    }));
  }

  getBoxList(): any[] {
    return Array.from({ length: 14 }, () => null);
  }

  getGridLayoutStyle(sizeList: number) {
    let numberOfLines = sizeList / 5;
    numberOfLines = Math.ceil(numberOfLines);
    // console.log('numberOfLines = ', numberOfLines);
    return {
      'grid-template-rows': 'repeat(' + numberOfLines + ', 220px)',
    };
  }

  getBoxImageURL(url: string): string {
    if (url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }
  protected readonly top = top;
}

export interface CardDailyItem {
  title: string;
  imageUrl?: string;
  nbrJour?: string;
  id?: string;
  isLocked?: string;
  isPlayed?: string;
  desactivDate?: string;
}
