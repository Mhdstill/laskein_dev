import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CardBoxItem } from 'src/app/components/card-box/card-box.component';
import { CardRewardLevelItem } from 'src/app/components/reward-level-box/reward-level-box.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  MyExpenseLineDTO,
  RewaedLevelDTO,
  RewardLevelService,
} from 'src/app/services/rewardLevel/reward-level.service';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { IBox } from 'src/app/store/box/box.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reward-level',
  templateUrl: './reward-level.component.html',
  styleUrls: ['./reward-level.component.scss'],
})
export class RewardLevelComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rewardLevelService: RewardLevelService,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getRewaedLevel();
    this.getRewaedLevelExpenseLine();
    this.getRewaedLevelMyTotalExpense();
    this.getUser();
  }

  expenseLineList: MyExpenseLineDTO[] = [];
  rewardLevelList: RewaedLevelDTO[] = [];
  rewardLevelListOrdernumber: number[] = [];
  cardRewardLevelItem!: CardRewardLevelItem;
  box: IBox[] = [];
  groupedRewardLevels: {
    orderNumber: number;
    unlockThreshold: number;
    rewardLevels: RewaedLevelDTO[];
  }[] = [];
  myDepenseTotal: any;
  prevThresholdLessThanDepenseTotal = false;
  selectedOfferId: string = '';
  selectedSubscriptionType: string = '';
  unlockThresholdGoupFilter: any;

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

  getRewaedLevel() {
    this.rewardLevelService
      .getAllRewardLevel({
        include: {
          boxRewardLevel: {
            include: {
              box: {
                include: {
                  boxType: true,
                },
              },
            },
          },
        },
      })
      .subscribe(data => {
        this.groupRewardLevelsByOrderNumber(data);
        this.rewardLevelList = data;
        console.log('liste data', this.rewardLevelList);
        const isGroupPlayed = this.groupedRewardLevels.filter(group =>
          group.rewardLevels.every(level => level.isPlayed === true)
        );
        const unlockThresholdGoup = isGroupPlayed.map(
          item => item.unlockThreshold
        );
        if (unlockThresholdGoup.length > 0) {
          const maxNumber = unlockThresholdGoup.reduce((max: any, current) => {
            if (
              !max ||
              (current !== undefined && (max === undefined || current > max))
            ) {
              return current;
            } else {
              return max;
            }
          }, null);
          this.unlockThresholdGoupFilter = `${maxNumber}`;
        }
      });
  }

  groupRewardLevelsByOrderNumber(rewardLevels: RewaedLevelDTO[]) {
    // Créer un objet  pour regrouper les éléments par orderNumber et unlockThreshold
    const groupedLevels: { [key: string]: RewaedLevelDTO[] } = {};
    rewardLevels.forEach(level => {
      // Vérifier d'abord si level.orderNumber et level.unlockThreshold sont définis
      if (
        level.orderNumber !== undefined &&
        level.orderNumber !== null &&
        level.unlockThreshold !== undefined &&
        level.unlockThreshold !== null
      ) {
        const key = `${level.orderNumber}_${level.unlockThreshold}`;
        if (key in groupedLevels) {
          groupedLevels[key].push(level);
        } else {
          groupedLevels[key] = [level];
        }
      }
    });
    // Convertir l'objet  en un tableau de groupes
    this.groupedRewardLevels = Object.keys(groupedLevels).map(key => {
      const [orderNumber, unlockThreshold] = key.split('_');
      return {
        orderNumber: parseInt(orderNumber, 10),
        unlockThreshold: parseFloat(unlockThreshold),
        rewardLevels: groupedLevels[key],
      };
    });
  }

  getRewaedLevelExpenseLine() {
    this.rewardLevelService.getAllRewardLevelExpenseLine().subscribe(data => {
      this.expenseLineList = data;
    });
  }

  getRewaedLevelMyTotalExpense() {
    this.rewardLevelService
      .getAllRewardLevelMyTotalExpense()
      .subscribe(data => {
        const depenseTotal = data;
        this.myDepenseTotal = `${depenseTotal}`;
      });
  }

  getColorForThreshold(threshold: any): string {
    const depenseTotal = this.myDepenseTotal;
    const isGroupPlayed = this.unlockThresholdGoupFilter;
    if (threshold <= isGroupPlayed) {
      this.prevThresholdLessThanDepenseTotal = true;
      return '#F79F48 ';
    } else if (threshold < depenseTotal) {
      this.prevThresholdLessThanDepenseTotal = true;
      return '#4CAF50';
    } else if (this.prevThresholdLessThanDepenseTotal) {
      this.prevThresholdLessThanDepenseTotal = false;
      return '#2196F3';
    } else {
      return 'white';
    }
  }

  selectOffer(id: any) {
    this.selectedOfferId = id;
    const userBoxId = this.selectedOfferId;
    localStorage.removeItem('BoxArticle');
    localStorage.removeItem('GameId');
    if (this.UserMe === true) {
      this.router.navigateByUrl(`/game/${userBoxId}`);
    } else {
      this.alertService.showAlert('ERROR', {
        header: 'Erreur',
        body: this.translate.instant('textNotifPourActiveCompte'),
      });
    }
  }

  getBackgroundColor(color: string): string {
    return 'background-color: ' + color + ' !important';
  }

  getBoxImageURL(url: string): string {
    // if (url.includes('upload-file')) {
    if (url && url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }

  convertToRoman(num: number) {
    const romanNumerals: any = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    let romanNumber = '';
    for (let key in romanNumerals) {
      while (num >= romanNumerals[key]) {
        romanNumber += key;
        num -= romanNumerals[key];
      }
    }
    return romanNumber;
  }

  pallierList = [
    { label: TRANSLATIONS['Pallier réçu'], color: '#FBA048' },
    { label: TRANSLATIONS['Pallier débloqué'], color: '#4CAF50' },
    { label: TRANSLATIONS['Pallier en cours'], color: '#2196F3' },
    { label: TRANSLATIONS['Pallier non débloqué'], color: '#ECECEC' },
  ];

  cardBoxItem: CardBoxItem = {
    title: 'box name',
    subTitle: 'pour homme',
    textLeft: 'Game',
    textRight: '50€',
  };
}

export const TRANSLATIONS = {
  'Pallier réçu': 'palier.palier_reçu',
  'Pallier débloqué': 'palier.palier_débloque',
  'Pallier en cours': 'palier.palier_en_cours',
  'Pallier non débloqué': 'palier.palier_non_débloqué',
};
