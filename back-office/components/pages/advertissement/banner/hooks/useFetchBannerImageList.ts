import { getBannerImageList } from 'services/redux/advertissment/banner';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchBannerImageList = () => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(
      getBannerImageList({
        args: {
          include: {
            box: true,
            offer: true,
          },
        },
      })
    );
  };
};

export default useFetchBannerImageList;
