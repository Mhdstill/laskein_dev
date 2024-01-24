import { Dispatch } from '@reduxjs/toolkit';
import { reloadUtilisateurList } from 'services/redux/users/admin/utilsateurSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListUtilisateur = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadUtilisateurList(uniqueId));
};

export default autoUpdateListUtilisateur;
