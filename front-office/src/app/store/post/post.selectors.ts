import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPostState } from './post.model';

export const selectPostState = createFeatureSelector<IPostState>('post');
export const selectPostList = createSelector(
  selectPostState,
  state => state.allPost
);
export const selectPostIsLoading = createSelector(
  selectPostState,
  state => state.isLoading
);
