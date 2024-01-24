import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation/presentation.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { StoreComponent } from './store/store.component';
import { SharedModule } from '../components/sharedModule';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DailyRewardComponent } from './bonus/daily-reward/daily-reward.component';
import { RewardLevelComponent } from './bonus/reward-level/reward-level.component';
import { SponsorshipComponent } from './bonus/sponsorship/sponsorship.component';
import { DetailBoxComponent } from './detail-box/detail-box.component';
import { GameComponent } from './detail-box/game/game.component';
import { GameTriedComponent } from './detail-box/game-tried/game-tried.component';
import { AuthGuard } from '../config/auth-guard';
import { DataService } from '../config/data.service';
import { AuthService } from '../services/auth/auth.service';
import { BoxService } from '../services/box/box.service';
import { BoxResolver } from '../store/box/box.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { UserResolver } from '../store/user/user.resolver';
import { WalletService } from '../services/wallet/wallet.service';
import { PanierComponent } from './panier/panier.component';
import { PaiementComponent } from './user-space/my-account/paiement/paiement.component';
import { MetionLegaleComponent } from './metion-legale/metion-legale.component';
import { RegleDuJeuxComponent } from './regle-du-jeux/regle-du-jeux.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilityService } from '../config/utility.service';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { CgvComponent } from './cgv/cgv.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: PresentationComponent },
      {
        path: 'store',
        component: StoreComponent,
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
      },
      {
        path: 'daily-reward',
        component: DailyRewardComponent,
      },
      {
        path: 'sponsorship',
        component: SponsorshipComponent,
      },
      {
        path: 'reward-level',
        component: RewardLevelComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detail-box/:id',
        component: DetailBoxComponent,
      },
      { path: 'game/:id', component: GameComponent },
      {
        path: 'game-tried/:id',
        component: GameTriedComponent,
      },
      {
        path: 'panier',
        component: PanierComponent,
      },
      {
        path: 'paiement',
        component: PaiementComponent,
      },
      {
        path: 'regle-du-jeux',
        component: RegleDuJeuxComponent,
      },
      {
        path: 'mention-legale',
        component: MetionLegaleComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'rgpd',
        component: RgpdComponent,
      },
      {
        path: 'cgv',
        component: CgvComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'user-space',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./user-space/user-space.module').then(m => m.UserSpaceModule),
      },
    ],
    resolve: {
      box: BoxResolver,
    },
  },
];

// @ts-ignore
@NgModule({
  declarations: [
    PresentationComponent,
    PagesComponent,
    StoreComponent,
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
    SubscriptionComponent,
    DailyRewardComponent,
    RewardLevelComponent,
    SponsorshipComponent,
    DetailBoxComponent,
    GameComponent,
    GameTriedComponent,
    PanierComponent,
    MetionLegaleComponent,
    RegleDuJeuxComponent,
    ContactComponent,
    FaqComponent,
    BlogComponent,
    AboutComponent,
    RgpdComponent,
    CgvComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  providers: [
    BoxResolver,
    UserResolver,
    AuthGuard,
    DataService,
    AuthService,
    BoxService,
    UserService,
    WalletService,
    UtilityService,
  ],
  exports: [SubscriptionComponent],
})
export class PagesModule {}
