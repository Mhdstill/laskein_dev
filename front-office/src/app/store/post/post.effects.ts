import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromPost from './index';
import { map, switchMap } from 'rxjs';
import { PostDTO } from './post.interface';
import { PostService } from 'src/app/services/post/post.service';

@Injectable()
export class PostEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly postService: PostService
  ) {}

  getAllPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPost.getAllPost.type),
      switchMap(() =>
        this.postService.getAllPost({
          include: { article: { include: { articlePhoto: true } } },
        })
      ),
      map((allPost: PostDTO[]) => fromPost.getAllPostSuccess({ allPost }))
    )
  );
}
