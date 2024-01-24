import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, first, tap } from 'rxjs';
import { selectBoxList } from './box.selectors';
import * as fromBox from '../../store/box/index';

@Injectable()
export class BoxResolver implements Resolve<Observable<any>> {
  constructor(private readonly store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectBoxList),
      tap(allBox => {
        if (allBox?.length == 0) {
          this.store.dispatch(fromBox.getAllBox());
        }
      }),
      first()
    );
  }
}
