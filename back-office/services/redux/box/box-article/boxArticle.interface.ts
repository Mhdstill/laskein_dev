import BoxArticleDTO from 'data/dto/BoxArticle.dto';

export interface BoxArticleInitialState {
  boxArticleList: BoxArticleDTO[];
  boxArticle: BoxArticleDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
