import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, first, tap } from 'rxjs';
import { selectPostList } from './post.selectors';
import * as fromPost from '../post/index';

@Injectable()
export class PostResolver implements Resolve<Observable<any>> {
  constructor(private readonly store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectPostList),
      tap(allPost => {
        if (allPost?.length == 0) {
          this.store.dispatch(fromPost.getAllPost());
        }
      }),
      first()
    );
  }
}
