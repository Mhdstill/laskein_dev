import { getDashboardList } from 'services/redux/dashboard/usecase/getList';
import { useAppDispatch } from 'services/redux/hooks';

const useFetchDashboardList = () => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(getDashboardList({}));
  };
};

export default useFetchDashboardList;
