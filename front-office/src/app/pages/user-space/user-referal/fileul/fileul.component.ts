import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { ParrainageService } from 'src/app/services/parrainage/parrainage.service';
import { DailyService } from 'src/app/services/rewardDaily/daily.service';
import { MIN_MONTANT_DEPENSE } from '../user-referal.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { IPatronage } from 'src/app/store/user/user.interface';
import { GameService } from 'src/app/services/game/game.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fileul',
  templateUrl: './fileul.component.html',
  styleUrls: ['./fileul.component.scss'],
})
export class FileulComponent implements OnInit {
  constructor(
    private parrainService: ParrainageService,
    private sharedDataService: SharedDataService,
    private parrainageService: ParrainageService,
    private gameService: GameService,
    private el: ElementRef,
    private renderer: Renderer2,
    private alertService: AlertService,
    private dailyService: DailyService,
    private translate: TranslateService
  ) {}

  @Input()
  isFileul!: boolean;
  totalExpense: number = 0;
  gainFromBackend!: number;
  childrenList: IPatronage[] = [];
  showSpinFileulWheel: boolean = false;
  @Input()
  selectedFileuil!: IPatronage | undefined;
  stopSpinCircle!: boolean;
  left!: boolean;
  parts: any[] = [];
  partsGain: any[] = [];
  rotation: number = 0;
  spinning: boolean = false;
  animationInterval: any;
  selectedGainNumber: any;
  idGameReturn: any;
  gainRecupere: any;
  GameIdReturn: any;

  @Input()
  set children(value: IPatronage[]) {
    if (value) {
      this.childrenList = value;
      // this.setup();
    }
  }

  goToSpin() {
    if (this.totalExpense >= MIN_MONTANT_DEPENSE) {
      this.handleDisplaySpinCircle();
    } else {
      // Notif alert
      this.alertService.showAlert('ERROR', {
        header: 'Warning',
        body: this.translate.instant('NotifRecupBonusFilleuls'),
        footer: 'footer',
      });
    }
  }

  handleDisplaySpinCircle() {
    this.showSpinFileulWheel = !this.showSpinFileulWheel;
  }

  ngOnInit() {
    this.dailyService.getFiluelTotalExpense().subscribe(expense => {
      this.totalExpense = +expense;
    });
    this.parts = gainFileuil;
    this.partsGain = gainFileuil.map(item => item.text);
    this.sharedDataService.getRefreshGameMyCoinBonusDraw().subscribe(data => {
      if (data !== null) {
        // refresh Game
        this.getOneGame();
      }
    });
  }

  startSpin() {
    this.runSpinCircle();
  }

  runSpinCircle() {
    this.parrainService.getChildBonus().subscribe(game => {
      this.idGameReturn = `${game.id}`;
      if (game.status === 'RUNNING') {
        this.spinning = true;
        this.rotateWheel();
      } else if (
        game.msg === 'Il est impossible de jouer, ou ce jeu a déjà été joué.'
      ) {
        this.alertService.showAlert('ERROR', {
          header: 'Erreur',
          body: this.translate.instant('affichageErreurParrin'),
          footer: 'footer',
        });
      }
    });
  }

  rotateWheel() {
    if (this.spinning) {
      const randomRotation = Math.floor(Math.random() * 360);
      this.rotation += randomRotation + 360;
      setTimeout(() => {
        this.rotateWheel();
      }, 300);
    } else {
    }
  }

  getOneGame() {
    const gameId = this.idGameReturn;
    if (gameId) {
      this.GameIdReturn = gameId;
      this.gameService
        .getOneGameUser(gameId, { include: { patronage: true } })
        .subscribe(response => {
          if (response.status === 'FINISHED') {
            this.gainRecupere = parseFloat(`${response.gainDraw}`);
            this.selectedGainNumber = this.gainRecupere;
            console.log('gain sélectionné', this.gainRecupere);
            this.spinning = false;
            let stopAngle: any;
            switch (this.gainRecupere) {
              case 10:
                stopAngle = 324;
                break;
              case 20:
                stopAngle = 288;
                break;
              case 30:
                stopAngle = 252;
                break;
              case 40:
                stopAngle = 216;
                break;
              case 50:
                stopAngle = 180;
                break;
              case 60:
                stopAngle = 144;
                break;
              case 70:
                stopAngle = 108;
                break;
              case 80:
                stopAngle = 72;
                break;
              case 90:
                stopAngle = 34;
                break;
              case 100:
                stopAngle = 360;
                break;
            }
            if (this.rotation !== stopAngle) {
              const clockwiseDifference =
                (stopAngle - this.rotation + 360) % 360;
              const counterclockwiseDifference =
                (this.rotation - stopAngle + 360) % 360;

              if (clockwiseDifference < counterclockwiseDifference) {
                this.rotation += clockwiseDifference;
              } else {
                this.rotation -= counterclockwiseDifference;
              }
            }
          }
        });
    }
  }

  getStyle(index: number, color: string): string {
    const stepCount = 360 / this.parts.length;
    const width = (2 * 3.14 * 400) / this.parts.length;
    // const left = this.left ? `260` : `228`;
    const degValue = stepCount * (index + 1);
    let style = `transform: rotate(${degValue}deg);`;
    style += `background-color: ${color} !important;`;
    style += `width : ${width}px !important;`;
    // style += `left: ${258}px !important`;

    return style;
  }
}

export const gainFileuil = [
  { text: '10', color: '#54B164' },
  { text: '20', color: '#DA7B93' },
  { text: '30', color: '#2E151B' },
  { text: '40', color: '#B28A1F' },
  { text: '50', color: '#814FAF' },
  { text: '60', color: '#F79F48' },
  { text: '70', color: '#D4549B' },
  { text: '80', color: '#EF4E50' },
  { text: '90', color: '#3F9788' },
  { text: '100', color: '#46BDD4' },
];
