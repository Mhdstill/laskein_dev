import PermissionDTO from '../../../data/dto/Permission.dto';

export interface PermisssionInitialState {
  permissionList: PermissionDTO[];
  permission: PermissionDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadPermission: string;
}
