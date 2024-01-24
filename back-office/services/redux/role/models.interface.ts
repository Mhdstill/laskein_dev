import RuleDTO from '../../../data/dto/Rule.dto';

export interface RoleInitialState {
  roleList: RuleDTO[];
  role: RuleDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadRole: string;
}
