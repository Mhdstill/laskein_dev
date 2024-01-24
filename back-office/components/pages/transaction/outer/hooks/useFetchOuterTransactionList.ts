import { useAppDispatch } from 'services/redux/hooks';
import { getOuterTransactionList } from 'services/redux/outerTransation';

const useFetchOuterTransactionList = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {
      // include: {
      // user: true,
      // },
      orderBy: {
        date: 'desc',
      },
    };
    dispatch(getOuterTransactionList({ args }));
  };
};

export default useFetchOuterTransactionList;
