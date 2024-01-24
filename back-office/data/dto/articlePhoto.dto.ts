export default interface ArticlePhotoDTO {
  id?: string;
  articleId?: string;
  photoUrl?: string;
  status: 'FIRST' | 'SECOND' | 'THIRD' | 'LAST' | string | undefined;
}
