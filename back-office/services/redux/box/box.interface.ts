import BoxDTO from 'data/dto/Box.dto';

export interface BoxInitialState {
  boxList: BoxDTO[];
  box: BoxDTO | undefined;
  isEditing: boolean;
  loading: boolean;
  showArticleInBox: boolean;
  showForm: boolean;
  boxId?: string;
  reloadBox: string;
  [key: string]: any;
}
