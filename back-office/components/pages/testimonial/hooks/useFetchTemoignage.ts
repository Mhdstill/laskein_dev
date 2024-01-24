import { TemoignageQuery } from 'data/Query/temoignage.query';
import { useAppDispatch } from 'services/redux/hooks';
import { getTemoignageList } from 'services/redux/temoignage';

const useFetchTemoignageListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: TemoignageQuery = {};
    args.include = {
      user: true,
    };
    dispatch(getTemoignageList({ args }));
  };
};

export default useFetchTemoignageListe;
