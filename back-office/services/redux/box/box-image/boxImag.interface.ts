import BoxImageDTO from 'data/dto/BoxImage.dto';

export interface BoxImageInitialState {
  boxImageList: BoxImageDTO[];
  boxImage: BoxImageDTO;
  isEditing: boolean;
  loading: boolean;
  reloadBoxImage: string;
  [key: string]: any;
}
