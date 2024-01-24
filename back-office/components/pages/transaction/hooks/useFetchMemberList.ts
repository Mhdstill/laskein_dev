import { useAppDispatch } from 'services/redux/hooks';
import { getTransactionList } from 'services/redux/transaction';

const useFetchTransactionList = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {
      include: {
        bank: true,
        wallet: {
          user: true,
        },
      },
    };
    dispatch(getTransactionList({ args }));
  };
};

export default useFetchTransactionList;
