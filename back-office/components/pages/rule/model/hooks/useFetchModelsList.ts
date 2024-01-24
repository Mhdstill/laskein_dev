import { getModelsList } from 'services/redux/model';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchModelListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getModelsList({ args }));
  };
};

export default useFetchModelListe;
