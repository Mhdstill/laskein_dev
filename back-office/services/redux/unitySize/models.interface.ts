import UnitySizeDTO from '../../../data/dto/UnitySize.dto';

export interface UnitySizeInitialState {
  unitySizeList: UnitySizeDTO[];
  unitySize: UnitySizeDTO;
  isEditing: boolean;
  loading: boolean;
  reloadUnitySize: string;
  [key: string]: any;
}
