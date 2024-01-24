import ArticleDTO from '../../../../data/dto/Article.dto';

export interface ArticleInitialState {
  articleList: ArticleDTO[];
  articleInBox: ArticleDTO[];
  article: ArticleDTO;
  isEditing: boolean;
  loading: boolean;
  activeUi: 'list' | 'form' | 'details';
  reloadArticle: string;
  [key: string]: any;
}
