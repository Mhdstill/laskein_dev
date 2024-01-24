import { getGameList } from 'services/redux/game/useCase/getList';
import { useAppDispatch } from 'services/redux/hooks';

const useFetchGameList = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    args.include = {
      userBox: {
        include: {
          user: true,
          box: true,
        },
      },
      // article: true,
    };
    dispatch(getGameList({ args }));
  };
};

export default useFetchGameList;
