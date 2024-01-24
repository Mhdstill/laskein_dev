import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, first, tap } from 'rxjs';
import { selectProviderList } from './provider.selectors';
import * as fromProvider from '../provider/index';

@Injectable()
export class ProviderResolver implements Resolve<Observable<any>> {
  constructor(private readonly store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectProviderList),
      tap(allProvider => {
        if (allProvider?.length == 0) {
          this.store.dispatch(fromProvider.getAllProvider());
        }
      }),
      first()
    );
  }
}
