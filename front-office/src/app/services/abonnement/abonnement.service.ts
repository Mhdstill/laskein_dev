import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { IAbonnement } from 'src/app/store/abonnement/abonnement.interface';
import { SubscriptionQuery } from 'src/app/utils/Query/subscription.query';
import { AuthService } from '../auth/auth.service';
import { ISubscription } from 'src/app/store/user/user.interface';
// import { User } from 'src/app/models/user.model';
// import { UserQuery } from 'src/app/utils/Query/user.query';

const OFFER_URL = 'offer';
const SUBSCRIPTION_URL = 'subscription';
const MY_SUBSCRIPTION_URL = 'subscription/my-subscription';

@Injectable({
  providedIn: 'root',
})
export class AbonnementService {
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  getAllAbonnement(): Observable<IAbonnement[]> {
    return this.dataService.getAll(OFFER_URL);
  }

  getAbonnementMe(params: SubscriptionQuery): Observable<ISubscription[]> {
    return this.dataService.getAll(MY_SUBSCRIPTION_URL, params);
  }

  createAbonnement(news: SubscriptionDTO): Observable<SubscriptionDTO> {
    return this.dataService.postOne(SUBSCRIPTION_URL, news);
  }

  getUserAbonnement(): Observable<ISubscription[]> {
    const subscriptionQuery: SubscriptionQuery = {
      where: {
        userId: this.authService.getUserId(),
      },
      include: {
        offer: true,
      },
    };
    return this.dataService.getAll(
      `${SUBSCRIPTION_URL}/my-subscription`,
      subscriptionQuery
    );
  }

  // je ne sais pas derrier de ce type any mais je vais creer une autre kkkk
  createUserAbonnement(subscription: any): Observable<SubscriptionDTO> {
    return this.dataService.postOne(SUBSCRIPTION_URL, subscription);
  }

  updateUserAbonnement(
    subscptionId: string,
    subscription: any
  ): Observable<ISubscription> {
    return this.dataService.updateOne(
      `${SUBSCRIPTION_URL}/update-my-subscription`,
      subscptionId,
      subscription
    );
  }

  editAbonnement(
    subscptionId: string,
    subscription: any
  ): Observable<SubscriptionDTO> {
    return this.dataService.updateOne(
      SUBSCRIPTION_URL,
      subscptionId,
      subscription
    );
  }
}

export interface SubscriptionDTO {
  id?: string;
  nbMonth: string;
  offerId: string;
  msg?: string;
  statusCode?: number;
  autoRenewal?: boolean;
}

export enum SubscriptionType {
  ONEMONTH = 'ONEMONTH',
  THREEMONTHS = 'THREEMONTHS',
}
