import { HistoricalQuery } from 'data/Query/historical.query';
import { useRouter } from 'next/router';
import { getHistoricalList } from 'services/redux/historical';
import { useAppDispatch } from 'services/redux/hooks';

const useFetchHistoricalList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: HistoricalQuery = {};
    if (router.query.search) {
      const search: any = router.query.search;
      args.where = {
        OR: [
          {
            user: {
              OR: [
                {
                  email: { contains: search, mode: 'insensitive' },
                },
              ],
            },
          },
        ],
      };
    }
    if (router.query.startDate && router.query.endDate) {
      args.where = {
        ...args.where,
        date: {
          lte: '01-01-2023',
          gte: '31-01-2023',
        },
      };
    }
    args.include = {
      user: true,
    };
    dispatch(getHistoricalList({ args }));
  };
};

export default useFetchHistoricalList;
