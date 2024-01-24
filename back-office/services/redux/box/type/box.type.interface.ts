import BoxTypeDTO from '../../../../data/dto/BoxType.dto';

export interface BoxTypeInitialState {
  boxTypeList: BoxTypeDTO[];
  boxType: BoxTypeDTO;
  isEditing: boolean;
  loading: boolean;
  reloadBoxType: string;
  [key: string]: any;
}
