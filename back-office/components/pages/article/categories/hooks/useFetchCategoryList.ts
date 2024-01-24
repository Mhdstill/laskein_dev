import { getCategoryList } from 'services/redux/article/category';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchCategoryListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getCategoryList({ args }));
  };
};

export default useFetchCategoryListe;
