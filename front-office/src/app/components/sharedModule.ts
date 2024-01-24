import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './ui-tools/dropdown-menu/dropdown-menu.component';
import { TextBoxComponent } from './ui-tools/text-box/text-box.component';
import { CardBoxComponent } from './card-box/card-box.component';
import { CustomCheckboxGroupComponent } from './ui-tools/custom-checkbox-group/custom-checkbox-group.component';
import { DailyRewardBoxComponent } from './daily-reward-box/daily-reward-box.component';
import { RouterModule } from '@angular/router';
import { CardTenisComponent } from './card-tenis/card-tenis.component';
import { CardGameComponent } from './card-game/card-game.component';
import { RewardLevelBoxComponent } from './reward-level-box/reward-level-box.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBlogComponent } from './card-blog/card-blog.component';
import { CardProviderComponent } from './card-provider/card-provider.component';
import { CardGrosLotComponent } from './card-gros-lot/card-gros-lot.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { CardBannerComponent } from './card-banner/card-banner.component';
import { CustomTablePanierComponent } from './custom-table-panier/custom-table-panier.component';
import { CardGameAnimationComponent } from './card-game-animation/card-game-animation.component';
import { CardeGameTrideComponent } from './carde-game-tride/carde-game-tride.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DropdownMenuComponent,
    TextBoxComponent,
    CardBoxComponent,
    CustomCheckboxGroupComponent,
    DailyRewardBoxComponent,
    CardTenisComponent,
    CardGameComponent,
    RewardLevelBoxComponent,
    CardBlogComponent,
    BestSellersComponent,
    ProfileDropdownComponent,
    CardProviderComponent,
    CardGrosLotComponent,
    CustomTableComponent,
    CardBannerComponent,
    CustomTablePanierComponent,
    CardGameAnimationComponent,
    CardeGameTrideComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    DropdownMenuComponent,
    TextBoxComponent,
    CardBoxComponent,
    CustomCheckboxGroupComponent,
    DailyRewardBoxComponent,
    CardTenisComponent,
    CardGameComponent,
    RewardLevelBoxComponent,
    BestSellersComponent,
    ProfileDropdownComponent,
    CardBlogComponent,
    CardProviderComponent,
    CardGrosLotComponent,
    CustomTableComponent,
    CardBannerComponent,
    CustomTablePanierComponent,
    CardGameAnimationComponent,
    CardeGameTrideComponent,
    CarouselComponent,
  ],
})
export class SharedModule {}
