import { useAppDispatch } from 'services/redux/hooks';
import { getTransactionList } from 'services/redux/transaction';

const useFetchTransactionList = () => {
  const dispatch = useAppDispatch();
  // const startDate = '04-09-2023';
  // const endDate = '';
  return () => {
    let args: any = {
      include: {
        bank: true,
        // wallet: {
        //   user: true,
        // },
      },
      // where: {
      //   ...(startDate && endDate
      //     ? {
      //         date: {
      //           AND: [
      //             { gte: new Date(startDate).toISOString() },
      //             { lte: new Date(endDate).toISOString() },
      //           ],
      //         },
      //       }
      //     : undefined),
      //   ...(startDate || endDate
      //     ? {
      //         date: {
      //           eq:
      //             new Date(startDate).toISOString() ||
      //             new Date(endDate).toISOString(),
      //         },
      //       }
      //     : undefined),
      // },
    };
    dispatch(getTransactionList({ args }));
  };
};

export default useFetchTransactionList;
