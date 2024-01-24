import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardBoxItem } from '../../components/card-box/card-box.component';
import {
  AbonnementService,
  SubscriptionDTO,
} from 'src/app/services/abonnement/abonnement.service';
import { IAbonnement } from 'src/app/store/abonnement/abonnement.interface';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  @Input()
  showBestSelling = true;

  listAbonnement: IAbonnement[] = [];
  myAbonnement: any;
  storedAbonnementId: string | null = null;
  showModal: boolean = false;
  userId: any;
  selectedOfferId: string = '';
  selectedSubscriptionType: string = '';

  cardBoxItem: CardBoxItem = {
    title: 'box name',
    subTitle: 'pour homme',
    textLeft: 'Game',
    textRight: '50€',
  };
  @Input()
  subscriptionUpdate: boolean = false;

  @Output()
  sendSelectedOffer: EventEmitter<any> = new EventEmitter();
  selectedOffer!: IAbonnement;

  constructor(
    private abonnementService: AbonnementService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getAllOffer();
    this.userId = this.authService.getUserId();
    this.sharedDataService.getGlobalOfferList().subscribe(data => {
      if (data !== null) {
        // Refresh all offer
        this.getAllOffer();
      }
    });
  }

  goToProfil() {
    this.router.navigate(['/user-space'], { fragment: 'porte-feuille' });
  }

  getAllOffer() {
    this.abonnementService.getAllAbonnement().subscribe(data => {
      this.listAbonnement = data;
    });
  }
  // creation abonnement

  selectOffer(subscription: IAbonnement, type: string) {
    this.showModal = true;
    this.selectedOfferId = subscription.id;
    this.selectedOffer = subscription;
    this.selectedSubscriptionType = type;
  }

  postAbonnement() {
    if (!this.subscriptionUpdate) {
      const newSubscription: SubscriptionDTO = {
        nbMonth: this.selectedSubscriptionType,
        offerId: this.selectedOfferId,
      };
      this.abonnementService
        .createAbonnement(newSubscription)
        .subscribe((createdSubscription: SubscriptionDTO) => {
          if (createdSubscription.msg === 'Solde insuffisant') {
            // this.alertService.showAlert('ERROR', {
            //   header: 'Info',
            //   body: this.translate.instant('soldeInsuffisant'),
            //   footer: 'footer',
            // });
            this.goToProfil();
          } else {
            this.alertService.showAlert('SUCCESS', {
              header: 'Info',
              body: this.translate.instant('valideAbonnement'),
              footer: 'footer',
            });
          }
          const AbonnementId = createdSubscription.id;
          this.myAbonnement = `${AbonnementId}`;
        });
    } else {
      // In case of susbcription update of user
      this.getSelectedSub(this.selectedOffer, this.selectedSubscriptionType);
    }
  }

  shouldShowMysteryBoxBronze(sub: any): boolean {
    return sub.numberMysteryBoxBronze > 0;
  }
  shouldShowMysteryBoxSylver(sub: any): boolean {
    return sub.numberMysteryBoxSylver > 0;
  }
  shouldShowMysteryBoxGold(sub: any): boolean {
    return sub.numberMysteryBoxGold > 0;
  }
  shouldShowAwardLevelActive(sub: any): boolean {
    500;
    return sub.isAwardLevelActive === true;
  }
  shouldShowWeeklyAwardActive(sub: any): boolean {
    return sub.isWeeklyAwardActive === true;
  }
  shouldShowStandardSupportActive(sub: any): boolean {
    return sub.isStandardSupportActive === true;
  }
  shouldShowVIPSupportActive(sub: any): boolean {
    return sub.isVIPSupportActive === true;
  }

  getBoxList(): any[] {
    return Array.from({ length: 6 }, () => null);
  }

  getBackground(color: string) {
    return `background-color: ${color} !important`;
  }

  getSelectedSub(abonnement: IAbonnement, duration: string) {
    if (!this.showBestSelling) {
      this.sendSelectedOffer.emit({
        offer: abonnement,
        duration: duration,
      });
    }
  }

  goTo() {
    this.router.navigateByUrl('auth');
  }
}
