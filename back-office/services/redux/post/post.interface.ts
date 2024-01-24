import PostDTO from 'data/dto/Post.dto';

export interface PostInitialState {
  postList: PostDTO[];
  post: PostDTO;
  isEditing: boolean;
  loading: boolean;
  activeUi: 'list' | 'form' | 'details';
  [key: string]: any;
  reloadPost: string;
}
