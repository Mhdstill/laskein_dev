import { getNewsLetterList } from 'services/redux/newsLetter';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchNewLetterListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getNewsLetterList({ args }));
  };
};

export default useFetchNewLetterListe;
