import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Categorie } from 'src/app/components/custom-table/custom-table.component';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ISubscription } from 'src/app/store/user/user.interface';

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss'],
})
export class SubscriptionManagementComponent implements OnInit {
  readOnly = true;
  allUserSubscription: ISubscription[] = [];

  userAbonnement!: ISubscription;
  isRenew: boolean = false;

  abonnementForm: FormGroup = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    offer: new FormControl('', [Validators.required]),
    daysLeft: new FormControl('', [Validators.required]),
  });

  tableColumns: string[] = [
    'AbonnementO',
    'Prix',
    'Date_de_début',
    'Date_de_fin',
  ];
  tableRows: any[] = [];

  constructor(
    private abonnementService: AbonnementService,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.setup();
  }

  setup() {
    this.abonnementForm.disable();
    this.abonnementService.getUserAbonnement().subscribe(abonnements => {
      if (Array.isArray(abonnements)) {
        this.allUserSubscription = abonnements;
      } else {
        this.allUserSubscription = [abonnements];
      }

      this.formatUserSubscription();
      const currentSubscription = this.getCurrentSubscription();
      if (currentSubscription) {
        this.userAbonnement = currentSubscription;
        this.setUserAbonnement();
      }
    });
  }

  formatUserSubscription() {
    this.tableRows = this.allUserSubscription.map(sub =>
      this.formatToRowObject(sub)
    );
  }

  setUserAbonnement() {
    this.abonnementForm.controls['startDate'].setValue(
      this.extractDate(this.userAbonnement?.startDate)
    );
    this.abonnementForm.controls['endDate'].setValue(
      this.extractDate(this.userAbonnement?.endDate)
    );
    this.abonnementForm.controls['offer'].setValue(
      this.userAbonnement?.offer?.name
    );
    this.abonnementForm.controls['daysLeft'].setValue(
      this.calculateNbDaysLeft()
    );
    this.isRenew = this.userAbonnement?.autoRenewal;
  }

  editSubscription() {
    if (this.abonnementForm.enabled) {
      this.abonnementForm.disable();
    } else {
      this.abonnementForm.enable();
    }
  }

  getCurrentSubscription(): ISubscription | null {
    let mostRecentDate: Date | null = null;
    let mostRecentSubscription: ISubscription | null = null;
    for (const sub of this.allUserSubscription) {
      if (!mostRecentDate || new Date(sub.startDate) > mostRecentDate) {
        mostRecentDate = new Date(sub.startDate);
        mostRecentSubscription = sub;
      }
    }
    return mostRecentSubscription;
  }

  updateSubscription() {}

  parseDateToISO(inputDate: string) {
    const parsedDate = new Date(inputDate + 'T00:00:00.000Z');
    return parsedDate.toISOString();
  }

  calculateNbDaysLeft(): number {
    const currentDate = new Date();
    const endDate = new Date(this.userAbonnement.endDate);
    if (currentDate.getTime() < endDate.getTime()) {
      const numberOfDays =
        (endDate.getTime() - currentDate.getTime()) / 86400000;
      return numberOfDays > 0 && numberOfDays < 1
        ? 1
        : Math.round(numberOfDays);
    } else return 0;
  }

  addDaysToDate(dateStr: string, daysToAdd: number): Date {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  }

  extractDate(dateStringIso: string) {
    const parsedDate = new Date(dateStringIso);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  overwriteSelectedOffer(data: any) {
    const { offer, duration } = data;
    this.editSubscription();
    this.abonnementService
      .createUserAbonnement({
        nbMonth: duration,
        offerId: offer.id,
      })
      .subscribe(abonnement => {
        this.setup();
        this.alertService.showAlert('SUCCESS', {
          header: 'Info',
          body: 'Votre abonnement a ete mis a jour avec succes',
          footer: 'footer',
        });
      });
  }

  updateOfferRenewal() {
    this.userAbonnement.autoRenewal = this.isRenew;
    this.abonnementService
      .updateUserAbonnement('', {
        nbMonth: this.userAbonnement?.durationType,
        offerId: this.userAbonnement?.offer?.id,
        autoRenewal: this.isRenew,
        subscriptionId: this.userAbonnement?.id,
      })
      .subscribe(() => {
        // Notif alert
        this.alertService.showAlert('SUCCESS', {
          header: 'Info',
          body: this.isRenew
            ? this.translate.instant('autoAbonnementActive')
            : this.translate.instant('autoAbonnementDesactive'),
          footer: 'footer',
        });
      });
  }

  modifOfferRenewal() {
    const idAb = this.userAbonnement.id;
    this.abonnementService
      .editAbonnement(idAb, {
        autoRenewal: this.isRenew,
        subscriptionId: this.userAbonnement?.id,
      })
      .subscribe(() => {
        // Notif alert
        this.alertService.showAlert('SUCCESS', {
          header: 'Info',
          body: this.isRenew
            ? this.translate.instant('autoAbonnementActive')
            : this.translate.instant('autoAbonnementDesactive'),
          footer: 'footer',
        });
      });
  }

  formatToRowObject(subscription: ISubscription) {
    return {
      AbonnementO: {
        displayValue: subscription.offer.name,
        categorie: Categorie.TEXT,
        style: {},
      },
      Prix: {
        displayValue: subscription.offer.price + ' €',
        categorie: Categorie.TEXT,
        style: {},
      },
      Date_de_début: {
        displayValue: this.extractDate(subscription.startDate),
        categorie: Categorie.TEXT,
        style: {},
      },
      Date_de_fin: {
        displayValue: this.extractDate(
          this.addDaysToDate(
            subscription.startDate,
            subscription.offer.duration
          ).toISOString()
        ),
        categorie: Categorie.TEXT,
        style: {},
      },
    };
  }
}
