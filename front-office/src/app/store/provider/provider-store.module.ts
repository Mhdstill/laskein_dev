import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProviderEffects } from './provider.effects';
import { providerReducer } from './provider.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('provider', providerReducer),
    EffectsModule.forFeature([ProviderEffects]),
  ],
})
export class ProviderStoreModule {}
