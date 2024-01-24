import ArticleDTO from './Article.dto';

export default interface PostDTO {
  id?: string;
  title: string;
  content: string;
  postUrl: string;
  article?: ArticleDTO;
  articleId: string;
}
