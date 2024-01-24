import { createAction, props } from '@ngrx/store';
import { PostDTO } from './post.interface';

const prefix = '[Post]';

//--------- get all post -------//
export const getAllPost = createAction(`${prefix} Get all post`);
export const getAllPostSuccess = createAction(
  `${getAllPost.type} Success`,
  props<{
    allPost: PostDTO[];
  }>()
);
