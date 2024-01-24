import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Categorie } from 'src/app/components/custom-table/custom-table.component';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GameService } from 'src/app/services/game/game.service';
import { ParrainageService } from 'src/app/services/parrainage/parrainage.service';
import { IPatronage } from 'src/app/store/user/user.interface';

@Component({
  selector: 'app-parrain',
  templateUrl: './parrain.component.html',
  styleUrls: ['./parrain.component.scss'],
})
export class ParrainComponent implements OnInit {
  @Input()
  selectedFileuil!: IPatronage | undefined;
  stopSpinCircle!: boolean;

  @Input()
  set children(value: IPatronage[]) {
    if (value) {
      this.childrenList = value;
      this.setup();
    }
  }
  gainFromBackend!: number;
  childrenList: IPatronage[] = [];
  showSpinFileulWheel: boolean = false;
  left!: boolean;
  parts: any[] = [];
  partsGain: any[] = [];
  rotation: number = 0;
  spinning: boolean = false;
  animationInterval: any;
  selectedGainNumber: any;
  idGameReturn: any;
  gainRecupere: any;
  tableRows: any[] = [];
  GameIdReturn: any;
  titles = ['Email', 'Nom et Prenoms', 'Status', 'Pourcentage'];
  tableColumns: string[] = [
    'E_mail',
    'Nom_et_prénom',
    'Status',
    'Pourcentage',
    'Temps_restant',
  ];

  constructor(
    private parrainService: ParrainageService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private parrainageService: ParrainageService,
    private gameService: GameService,
    private el: ElementRef,
    private renderer: Renderer2,
    private alertService: AlertService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setup();
    this.parts = gainParent;
    this.partsGain = gainParent.map(item => item.gain);
    this.sharedDataService
      .getRefreshGameBonusDrawPercentage()
      .subscribe(data => {
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
    this.parrainService
      .getParentBonusFromChild(this.selectedFileuil?.userChild?.id ?? '')
      .subscribe(game => {
        this.idGameReturn = `${game.id}`;
        if (game.status === 'RUNNING') {
          this.spinning = true;
          this.rotateWheel();
        } else if (
          game.msg ===
          "Il est impossible de jouer. Cet utilisateur n'est pas votre filleul, ou ce jeu a déjà été joué."
        ) {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('affichageErreurParrin'),
            footer: 'footer',
          });
        } else if (
          game.msg ===
          'Il est impossible de jouer, votre filleul doit depenser au moins 50 €.'
        ) {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('NotifRecupBonusParrain'),
            footer: 'footer',
          });
        }
      });
  }

  getOneGame() {
    const gameId = this.idGameReturn;
    if (gameId) {
      this.GameIdReturn = gameId;
      this.gameService
        .getOneGameUser(this.GameIdReturn, { include: { patronage: true } })
        .subscribe(response => {
          if (response.status === 'FINISHED') {
            this.gainRecupere = parseFloat(`${response.gainPercentage}`);
            this.selectedGainNumber = this.gainRecupere;
            this.spinning = false;
            let stopAngle: any;
            switch (this.gainRecupere) {
              case 1:
                stopAngle = 315;
                break;
              case 2:
                stopAngle = 270;
                break;
              case 3:
                stopAngle = 225;
                break;
              case 4:
                stopAngle = 180;
                break;
              case 5:
                stopAngle = 135;
                break;
              case 6:
                stopAngle = 90;
                break;
              case 7:
                stopAngle = 45;
                break;
              case 8:
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

  getStyle(index: number, color: string): string {
    const stepCount = 360 / this.parts.length;
    const width = (2 * 3.14 * 400) / this.parts.length;
    const left = this.left ? `260` : `228`;
    const degValue = stepCount * (index + 1);
    let style = `transform: rotate(${degValue}deg);`;
    style += `background-color: ${color} !important;`;
    style += `width : ${width}px !important;`;
    style += `left: ${left}px !important`;

    return style;
  }

  extractDate(dateStringIso: string) {
    const parsedDate = new Date(dateStringIso);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatToRowObject(pat: IPatronage) {
    let statusTranslation = '';

    if (pat.status === 'APPROVED') {
      statusTranslation = TRANSLATIONS['Approuvé'];
    } else if (pat.status === 'PENDING') {
      statusTranslation = TRANSLATIONS['En_attente'];
    } else {
      statusTranslation = pat.status;
    }
    const bonusEndDate = new Date(pat?.bonusEndDate);
    const currentDate = new Date();
    const timeDifference = bonusEndDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return {
      E_mail: {
        displayValue: pat?.userChild?.email,
        categorie: Categorie.TEXT,
        style: {},
      },
      Nom_et_prénom: {
        displayValue: `${pat?.userChild?.firstName} ${pat?.userChild?.lastName}`,
        categorie: Categorie.TEXT,
        style: {},
      },
      Status: {
        displayValue: statusTranslation,
        categorie: Categorie.TEXT,
        style: {},
      },
      Pourcentage: {
        displayValue:
          pat.status === 'APPROVED' ? pat.gainPercentage : 'recupererBonus',
        categorie: Categorie.BUTTON,
        style: {},
        class: '!bg-[#1976D2] pt-1 pb-1 pl-3  pr-3 mr-5 rounded-[20px]',
      },
      Temps_restant: {
        displayValue: daysRemaining >= 0 ? `${daysRemaining} jours` : '',
        categorie: Categorie.TEXT,
        style: {},
      },
    };
  }

  setup() {
    this.tableRows = this.childrenList.map(child =>
      this.formatToRowObject(child)
    );
  }

  goToSpin(event: any) {
    const { clickedRowData } = event;
    this.selectedFileuil = this.childrenList.find(
      child => child?.userChild?.email === clickedRowData.E_mail.displayValue
    );
    this.rotation = 0;
    this.selectedGainNumber = null;

    this.handleDisplaySpinCircle();
  }

  handleDisplaySpinCircle() {
    this.showSpinFileulWheel = !this.showSpinFileulWheel;
  }
}

export const gainParent = [
  { gain: 1, color: '#54B164' },
  { gain: 2, color: '#F79F48' },
  { gain: 3, color: '#2196F3' },
  { gain: 4, color: '#614297' },
  { gain: 5, color: '#EF4E50' },
  { gain: 6, color: '#607D8B' },
  { gain: 7, color: '#2E151B' },
  { gain: 8, color: '#B28A1F' },
];

export const TRANSLATIONS = {
  Approuvé: 'Approuvé',
  En_attente: 'En_attente',
};
