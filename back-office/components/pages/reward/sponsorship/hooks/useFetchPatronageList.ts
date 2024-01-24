import { PatronageQuery } from 'data/Query/patronage.query';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'services/redux/hooks';
import { getPatronageList } from 'services/redux/patronage';

const useFetchPatronageListe = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return () => {
    let args: PatronageQuery = {};
    if (router.query.search) {
      const search: any = router.query.search;
      args.where = {
        OR: [
          {
            userParent: {
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
    args.include = {
      userParent: {
        include: {
          subscription: {
            include: {
              offer: true,
            },
          },
        },
      },
    };
    dispatch(getPatronageList({ args }));
  };
};

export default useFetchPatronageListe;
