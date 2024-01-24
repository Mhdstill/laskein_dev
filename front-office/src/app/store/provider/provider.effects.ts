import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromProvider from './index';
import { map, switchMap } from 'rxjs';
import { ProviderDTO } from './provider.interface';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';

@Injectable()
export class ProviderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly providerService: FournisseurService
  ) {}

  getAllProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProvider.getAllProvider.type),
      switchMap(() => this.providerService.getAllProvider()),
      map((allProvider: ProviderDTO[]) =>
        fromProvider.getAllProviderSuccess({ allProvider })
      )
    )
  );
}
