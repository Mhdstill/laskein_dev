import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSpaceRoutingModule } from './user-space-routing.module';
import { UserSpaceComponent } from './user-space.component';
import { SharedModule } from 'src/app/components/sharedModule';
import { MyAccountComponent } from './my-account/my-account.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { UserRewardLevelComponent } from './user-reward-level/user-reward-level.component';
import { UserReferalComponent } from './user-referal/user-referal.component';
import { SpinCircleComponent } from './spin/spin-circle/spin-circle.component';
import { FileulComponent } from './user-referal/fileul/fileul.component';
import { ParrainComponent } from './user-referal/parrain/parrain.component';
import { ProfilComponent } from './my-account/profil/profil.component';
import { PorteFeuilleComponent } from './my-account/porte-feuille/porte-feuille.component';
import { MonAdresseComponent } from './my-account/mon-adresse/mon-adresse.component';
import { CompteComponent } from './my-account/compte/compte.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StripeModule } from 'stripe-angular';
import { PaiementComponent } from './my-account/paiement/paiement.component';
import { environment } from 'src/environments/environment';
import { PagesModule } from '../pages.module';
import { TranslateModule } from '@ngx-translate/core';
import { StatuCodeComponent } from './my-account/statu-code/statu-code.component';

@NgModule({
  declarations: [
    UserSpaceComponent,
    MyAccountComponent,
    TrackingOrderComponent,
    SubscriptionManagementComponent,
    UserRewardLevelComponent,
    UserReferalComponent,
    SpinCircleComponent,
    FileulComponent,
    ParrainComponent,
    ProfilComponent,
    PorteFeuilleComponent,
    MonAdresseComponent,
    CompteComponent,
    PaiementComponent,
    StatuCodeComponent,
  ],
  imports: [
    CommonModule,
    UserSpaceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StripeModule.forRoot(environment.STRIPE_KEY),
    PagesModule,
    TranslateModule,
  ],
})
export class UserSpaceModule {}
