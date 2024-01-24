import { getDailyRewardList } from 'services/redux/reward/daily';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchDailyRewardList = () => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(
      getDailyRewardList({
        args: {
          include: {
            box: {
              include: {
                boxType: true,
              },
            },
          },
        },
      })
    );
  };
};

export default useFetchDailyRewardList;
