import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, first, tap } from 'rxjs';
import { selectAbonnementList } from './abonnement.selectors';
import * as fromAbonnement from '../abonnement/index';

@Injectable()
export class AbonnementResolver implements Resolve<Observable<any>> {
  constructor(private readonly store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectAbonnementList),
      tap(allBox => {
        if (allBox?.length == 0) {
          this.store.dispatch(fromAbonnement.getAllAbonnement());
        }
      }),
      first()
    );
  }
}
