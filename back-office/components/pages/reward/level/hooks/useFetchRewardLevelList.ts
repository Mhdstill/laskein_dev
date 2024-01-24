import { getRewardLevelList } from 'services/redux/reward/level';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchRewardLevelList = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    args.include = {};
    dispatch(getRewardLevelList(args));
  };
};

export default useFetchRewardLevelList;
