import { useRouter } from 'next/router';
import { getBoxRewardLevelList } from 'services/redux/reward/boxRewardLevel';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchBoxRewardLevelList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { rewardLevelId } = router.query;
  return () => {
    if (rewardLevelId)
      dispatch(
        getBoxRewardLevelList({
          args: {
            include: {
              box: {
                include: {
                  boxType: true,
                },
              },
            },
            where: { rewardLevelId },
          },
        })
      );
  };
};

export default useFetchBoxRewardLevelList;
