import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, first, tap } from 'rxjs';
import { selectUserById } from './user.selectors';
import * as fromUser from '../../store/user/index';
import { SharedDataService } from 'src/app/config/shared-data-service';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly store: Store,
    private sharedDataService: SharedDataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectUserById),
      tap(user => {
        if (user) {
          this.store.dispatch(fromUser.getUserById());
        }
      }),
      first()
    );
  }
}
