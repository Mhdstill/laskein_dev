import { getPermissionList } from 'services/redux/permission';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchPermissionListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getPermissionList({ args }));
  };
};

export default useFetchPermissionListe;
