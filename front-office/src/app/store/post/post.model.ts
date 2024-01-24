import { PostDTO } from './post.interface';

export interface IPostState {
  allPost: PostDTO[];
  isLoading: boolean;
}
