import { SubscriptionQuery } from 'data/Query/subscription.query';
import { useRouter } from 'next/router';
import { getSubscriptionList } from 'services/redux/abonnement/subscription';
import { useAppDispatch } from 'services/redux/hooks';

const useFetchSubscriptionList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: SubscriptionQuery = {};
    let searchParams = router.query.search as string;
    let filterParams = router.query.filter as string;
    if (router.query.filter && router.query.search) {
      args.where = {
        AND: [
          {
            offer: {
              name: { contains: filterParams, mode: 'insensitive' },
            },
          },
          {
            OR: [
              {
                user: {
                  OR: [
                    {
                      email: { contains: searchParams, mode: 'insensitive' },
                    },
                  ],
                },
              },
            ],
          },
        ],
      };
    } else if (
      router.query.search &&
      (router.query.filter === undefined || router.query.filter === '')
    ) {
      args.where = {
        OR: [
          {
            user: {
              OR: [{ email: { contains: searchParams, mode: 'insensitive' } }],
            },
          },
        ],
      };
    } else if (
      router.query.filter &&
      (router.query.search === undefined || router.query.search === '')
    ) {
      args.where = {
        offer: {
          name: { contains: filterParams, mode: 'insensitive' },
        },
      };
    }
    args.include = {
      offer: true,
      user: {
        include: {
          wallet: true,
        },
      },
    };
    dispatch(getSubscriptionList({ args }));
  };
};

export default useFetchSubscriptionList;
