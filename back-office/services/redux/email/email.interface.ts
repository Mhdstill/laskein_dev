import EmailDTO from 'data/dto/Email.dto';

export interface EmailInitialState {
  emailList: EmailDTO[];
  email: EmailDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
