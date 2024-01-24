import ModelDTO from './Model.dto';
import PermissionDTO from './Permission.dto';

export default interface PermissionModelDTO {
  permission: PermissionDTO;
  model: ModelDTO;
}
