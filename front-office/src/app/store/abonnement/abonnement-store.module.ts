import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AbonnementEffects } from './abonnement.effects';
import { abonnementReducer } from './abonnement.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('abonnement', abonnementReducer),
    EffectsModule.forFeature([AbonnementEffects]),
  ],
})
export class AbonnementStoreModule {}
