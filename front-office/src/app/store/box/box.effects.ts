import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoxService } from 'src/app/services/box/box.service';
import * as fromBox from './index';
import { map, switchMap } from 'rxjs';
import { IBox } from './box.interface';

@Injectable()
export class BoxEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boxService: BoxService
  ) {}

  getAllBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBox.getAllBox.type),
      switchMap(() =>
        this.boxService.getAllBox({
          include: {
            boxParams: true,
            boxType: true,
            boxImage: true,
            boxArticle: {
              include: { article: { include: { provider: true } } },
            },
          },
        })
      ),
      map((allBox: IBox[]) => fromBox.getAllBoxSuccess({ allBox }))
    )
  );
}
