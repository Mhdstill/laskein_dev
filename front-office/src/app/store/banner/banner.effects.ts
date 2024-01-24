import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromBanner from './index';
import { map, switchMap } from 'rxjs';
import { BannerDTO } from './banner.interface';
import { BannerService } from 'src/app/services/banner/banner.service';

@Injectable()
export class BannerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly bannerService: BannerService
  ) {}

  getAllBanner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBanner.getAllBanner.type),
      switchMap(() =>
        this.bannerService.getAllBanner({
          include: { box: true },
        })
      ),
      map((allBanner: BannerDTO[]) =>
        fromBanner.getAllBannerSuccess({ allBanner })
      )
    )
  );
}
