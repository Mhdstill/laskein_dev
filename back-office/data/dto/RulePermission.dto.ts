import PermissionDTO from './Permission.dto';
import RuleDTO from './Rule.dto';

export default interface RulePermissionDTO {
  rule: RuleDTO;
  permission: PermissionDTO;
}
