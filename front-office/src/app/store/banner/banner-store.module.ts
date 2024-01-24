import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BannerEffects } from './banner.effects';
import { bannerReducer } from './banner.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('banner', bannerReducer),
    EffectsModule.forFeature([BannerEffects]),
  ],
})
export class BannerStoreModule {}
