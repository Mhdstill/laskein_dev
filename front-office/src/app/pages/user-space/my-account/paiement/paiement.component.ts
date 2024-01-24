import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/store/user/user.interface';
import { environment } from 'src/environments/environment';
import * as fromUser from '../../../../store/user/index';
import { StripeService } from 'src/app/services/stripe/stripe.service';
import {
  EnumStatusTransaction,
  EnumTypeTransaction,
  OuterTransactionService,
} from 'src/app/services/outerTransaction/outer-transaction.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { bannerReducer } from 'src/app/store/banner/banner.reducer';
@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'],
})
export class PaiementComponent {
  user$!: Observable<IUser>;
  user!: IUser;

  paymentHandler: any = null;
  amountValue: number = 0;
  stripe: Stripe | null | undefined;
  paymentToken: any = null;
  @Input()
  isDeposit: boolean = false;

  constructor(
    private readonly store: Store,
    private outerTransactionService: OuterTransactionService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}
  async ngOnInit() {
    this.invokeStripe();
    this.setUp();
  }

  setUp() {
    // Get it from user store
    this.user$ = this.store.pipe(select(fromUser.selectUserById));
    this.user$.subscribe(myUser => {
      this.user = myUser;
      console.log('Got uer ' + this.user);
    });
  }

  getWallet() {
    let balanceUser = parseFloat(this.user?.wallet?.balance.toFixed(2)!);
    console.log('balance', balanceUser);
    return balanceUser;
  }

  onAmountChange(event: any) {
    this.amountValue = +event.target.value;
    console.log(this.amountValue);
  }

  chargeClient(
    amount: number,
    source: string,
    currency: string,
    description: string
  ) {
    this.outerTransactionService
      .createDeposit({
        amount: amount,
        date: new Date().toISOString(),
        status: EnumStatusTransaction.APPROVED,
        type: EnumTypeTransaction.DEPOSIT,
        userId: this.user.id,
        currency: currency,
        description: description,
        sourceId: source,
        stripeTransactionId: '',
      })
      .subscribe(
        (response: any) => {
          // Successful login logic
          this.alertService.showAlert('SUCCESS', {
            header: 'Info',
            body: this.translate.instant('DepositSuccess'),
          });
        },
        // eslint-disable-next-line no-unused-vars
        error => {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('DepositError'),
          });
        }
      );
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.STRIPE_KEY,
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        this.paymentToken = stripeToken;
        this.chargeClient(
          amount,
          stripeToken.id,
          'EUR',
          'Dépot de ' + String(amount) + ' le ' + new Date().toISOString()
        );
      },
    });
    paymentHandler.open({
      name: 'PAIEMENT',
      description: this.translate.instant('makeDeposit'),
      amount: amount * 100,
      currency: 'EUR',
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: environment.STRIPE_KEY,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  submitPayement() {
    if (this.isDeposit) {
      this.makePayment(this.amountValue);
    } else {
      this.askWithdraw();
    }
  }

  askWithdraw() {
    if (this.getWallet() <= this.amountValue) {
      this.alertService.showAlert('ERROR', {
        header: 'Erreur',
        body: this.translate.instant('notEnoughMoney'),
      });
    } else {
      this.outerTransactionService
        .createWithdraw({
          amount: this.amountValue,
          date: new Date().toISOString(),
          status: EnumStatusTransaction.PENDING,
          type: EnumTypeTransaction.WITHDRAWAL,
          userId: this.user.id,
          currency: 'EUR',
          description:
            'Demande retrait de ' +
            String(this.amountValue) +
            ' le ' +
            new Date().toISOString(),
          sourceId: '',
          stripeTransactionId: '',
        })
        .subscribe(
          (response: any) => {
            // Successful login logic
            this.alertService.showAlert('SUCCESS', {
              header: 'Info',
              body: this.translate.instant('WithdrawSuccess'),
            });
          },
          // eslint-disable-next-line no-unused-vars
          error => {
            this.alertService.showAlert('ERROR', {
              header: 'Erreur',
              body: this.translate.instant('WithdrawError'),
            });
          }
        );
    }
  }
}
