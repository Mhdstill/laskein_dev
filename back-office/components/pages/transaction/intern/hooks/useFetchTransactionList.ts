import { TransactionQuery } from 'data/Query/transaction.query';
import { useAppDispatch } from 'services/redux/hooks';
import { getTransactionList } from 'services/redux/transaction';

const useFetchTransactionList = (startDate?: string, endDate?: string) => {
  const dispatch = useAppDispatch();

  return () => {
    let args: TransactionQuery = {};

    args.include = {
      bank: true,
      wallet: {
        include: {
          user: true,
        },
      },
    };

    if (startDate && !endDate) {
      args.where = {
        date: {
          gte: new Date(startDate)?.toISOString(),
        },
      };
    } else if (!startDate && endDate) {
      args.where = {
        date: {
          lte: new Date(endDate)?.toISOString(),
        },
      };
    } else if (startDate && endDate) {
      if (startDate === endDate) {
        args.where = {
          date: {
            gte: new Date(startDate)?.toISOString(),
          },
        };
      } else {
        args.where = {
          date: {
            gte: new Date(startDate)?.toISOString(),
            lte: new Date(endDate)?.toISOString(),
          },
        };
      }
    }
    dispatch(getTransactionList({ args }));
  };
};

export default useFetchTransactionList;
