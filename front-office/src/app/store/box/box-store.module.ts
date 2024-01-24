import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoxEffects } from './box.effects';
import { boxReducer } from './box.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('box', boxReducer),
    EffectsModule.forFeature([BoxEffects]),
  ],
})
export class BoxStoreModule {}
