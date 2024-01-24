import { IPostState } from './post.model';
import { getAllPost } from './post.actions';
import * as fromPost from './index';
import { createReducer, on } from '@ngrx/store';
import { from, filter } from 'rxjs';

export const initialPostState: IPostState = {
  allPost: [],
  isLoading: false,
};

const reducer = createReducer<IPostState>(
  initialPostState,

  // Get all post
  on(fromPost.getAllPost, (state: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromPost.getAllPostSuccess, (state, { allPost }) => {
    return {
      ...state,
      isLoading: false,
      allPost,
    };
  })
);

export function postReducer(
  state = initialPostState,
  actions: any
): IPostState {
  return reducer(state, actions);
}
