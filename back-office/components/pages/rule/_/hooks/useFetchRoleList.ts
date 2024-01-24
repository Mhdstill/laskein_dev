import { getRoleList } from 'services/redux/role';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchRoleListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getRoleList({ args }));
  };
};

export default useFetchRoleListe;
