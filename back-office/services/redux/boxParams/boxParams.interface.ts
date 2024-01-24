import BoxParamsDTO from 'data/dto/BoxParams.dto';

export interface BoxParamsInitialState {
  boxParamsList: BoxParamsDTO[];
  boxParams: BoxParamsDTO;
  isEditing: boolean;
  loading: boolean;
  reloadBoxParams: string;
  [key: string]: any;
}
