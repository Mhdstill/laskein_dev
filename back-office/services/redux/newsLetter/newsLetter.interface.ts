import NewsLetterDTO from 'data/dto/NewsLetter.dto';

export interface NewsLetterInitialState {
  newsLetterList: NewsLetterDTO[];
  newsLetter: NewsLetterDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadNewsLetter: string;
}
