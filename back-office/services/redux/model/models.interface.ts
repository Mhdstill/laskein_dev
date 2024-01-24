import ModelDTO from '../../../data/dto/Model.dto';

export interface ModelsInitialState {
  modelsList: ModelDTO[];
  models: ModelDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadModel: string;
}
