import { getBankList } from 'services/redux/bank';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchBankListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getBankList({ args }));
  };
};

export default useFetchBankListe;
