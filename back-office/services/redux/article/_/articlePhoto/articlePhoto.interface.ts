import ArticlePhotoDTO from 'data/dto/articlePhoto.dto';

export interface ArticlePhotoInitialState {
  articlePhotoList: ArticlePhotoDTO[];
  articlePhoto: ArticlePhotoDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
