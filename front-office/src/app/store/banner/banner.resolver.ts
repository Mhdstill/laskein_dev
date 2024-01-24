import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, first, tap } from 'rxjs';
import { selectBannerList } from './banner.selectors';
import * as fromBanner from '../banner/index';

@Injectable()
export class BannerResolver implements Resolve<Observable<any>> {
  constructor(private readonly store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectBannerList),
      tap(allBanner => {
        if (allBanner?.length == 0) {
          this.store.dispatch(fromBanner.getAllBanner());
        }
      }),
      first()
    );
  }
}
