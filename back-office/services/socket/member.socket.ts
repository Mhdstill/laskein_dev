import { Dispatch } from '@reduxjs/toolkit';
import { reloadMemberList } from 'services/redux/users/member/memberSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListMember = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadMemberList(uniqueId));
};

export default autoUpdateListMember;
