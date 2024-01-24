import UserDTO from 'data/dto/User.dto';

export interface UtilisateurInitialState {
  utilisateurList: UserDTO[];
  utilisateur: UserDTO;
  isEditing: boolean;
  loading: boolean;
  reloadUtilisateur: string;
  [key: string]: any;
}
