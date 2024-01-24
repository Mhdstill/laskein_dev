import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAbonnement from './index';
import { map, switchMap } from 'rxjs';
import { IAbonnement } from './abonnement.interface';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';

@Injectable()
export class AbonnementEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly abonnementService: AbonnementService
  ) {}

  getAllAbonnement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAbonnement.getAllAbonnement.type),
      switchMap(
        () => this.abonnementService.getAllAbonnement()
        // include: { boxParams: true, boxType: true, boxImage: true },
      ),
      map((allAbonnement: IAbonnement[]) =>
        fromAbonnement.getAllAbonnementSuccess({ allAbonnement })
      )
    )
  );
}
