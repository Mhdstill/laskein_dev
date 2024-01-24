import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/components/custom-table/custom-table.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoxService } from 'src/app/services/box/box.service';
import {
  BoxStatus,
  GameService,
  UserBoxDTO,
} from 'src/app/services/game/game.service';
import { DailyService } from 'src/app/services/rewardDaily/daily.service';
import { RewardLevelService } from 'src/app/services/rewardLevel/reward-level.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-reward-level',
  templateUrl: './user-reward-level.component.html',
  styleUrls: ['./user-reward-level.component.scss'],
})
export class UserRewardLevelComponent implements OnInit {
  constructor(
    private boxService: BoxService,
    private authService: AuthService,
    private dailyService: DailyService,
    private rewardLevelService: RewardLevelService,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getBackgroundColor(color: string): string {
    return 'background-color: ' + color + ' !important';
  }

  titles = ['Photo', 'Designation', 'Date', 'Status'];

  tableColumns: string[] = ['Photo', 'Désignation', 'Date', 'Status'];
  tableRows: any[] = [];
  rewardLevelList: UserBoxDTO | undefined;
  newsListuserBox: UserBoxDTO[] = [];
  totalExpense: number = 0;
  showClick: boolean = false;
  id: any;
  selectedOrder: UserBoxDTO | undefined;

  ngOnInit() {
    this.dailyService.getTotalExpense().subscribe(expense => {
      this.totalExpense = +expense;
    });
    this.gameService
      .getAllUserBox({
        where: { userId: this.authService.getUserId(), type: 'REWARD_LEVEL' },
        include: {
          box: {
            include: {
              boxType: true,
              boxImage: true,
            },
          },
        },
      })
      .subscribe(data => {
        this.newsListuserBox = data;
        const list = data.filter(list => list.isLocked === false);
        this.tableRows = list.map(userBox => this.formatToRowObject(userBox));
      });
    this.dailyService.getTotalExpense().subscribe(expense => {
      this.totalExpense = +expense;
    });
  }

  extractDate(dateStringIso: any) {
    const parsedDate = new Date(dateStringIso);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  formatToRowObject(userBox: UserBoxDTO) {
    const statusColor = userBox?.isPlayed ? '#54B164' : '#1976D2';
    const openedImage = userBox?.box?.boxImage?.find(
      image => image.status === BoxStatus.CLOSED
    );
    const statusLabel = userBox?.isPlayed
      ? TRANSLATIONS['OBTENU']
      : TRANSLATIONS['A RECUPERER'];

    const photoUrl = openedImage
      ? this.getBoxImageURL(openedImage.photoUrl)
      : '/assets/img/coffre-ouvert.png';

    return {
      id: {
        displayValue: userBox?.id ?? '',
        categorie: Categorie.TEXT,
        style: {},
      },
      Photo: {
        displayValue: photoUrl,
        categorie: Categorie.IMAGE,
        style: {
          width: '60px',
          height: '60px',
        },
      },
      Désignation: {
        displayValue: userBox?.box?.name ?? '',
        categorie: Categorie.TEXT,
        style: {},
      },
      Date: {
        displayValue: this.extractDate(userBox.updatedAt),
        categorie: Categorie.TEXT,
        style: {},
      },
      Status: {
        displayValue: statusLabel,
        categorie: Categorie.BUTTON,
        style: {
          'background-color': statusColor,
          color: 'white',
          padding: '6px 12px',
          'border-radius': '20px',
          'margin-right': '5px',
        },
      },
    };
  }

  goToGame(event: any) {
    localStorage.removeItem('GameId');
    localStorage.removeItem('BoxArticle');
    const { clickedRowData } = event;
    if (clickedRowData.id.displayValue) {
      this.selectedOrder = this.newsListuserBox.find(
        test => test.id === clickedRowData.id.displayValue
      );
      const id_Recupere = this.selectedOrder?.id;
      const test = this.selectedOrder?.isPlayed;
      if (test === false) {
        this.router.navigateByUrl(`/game/${id_Recupere}`);
      }
    }
  }
}

export const TRANSLATIONS = {
  OBTENU: 'Acquis',
  'A RECUPERER': 'A_récupérer',
};
