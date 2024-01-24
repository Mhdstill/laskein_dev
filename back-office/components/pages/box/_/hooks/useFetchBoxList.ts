import { BoxQuery } from 'data/Query/box.query';
import { useRouter } from 'next/router';
import { getBoxList } from 'services/redux/box/useCase/getList';
import { useAppDispatch } from 'services/redux/hooks';

export default function useFetchBoxList() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchBoxList = () => {
    let args: BoxQuery = {
      select: {
        id: true,
        reference: true,
        name: true,
        boxType: true,
        price: true,
        number: true,
      },
    };

    if (router.query) {
      const search: any = router.query.search;
      const boxTypeId: any = router.query.boxTypeId;

      if (router.query.search && router.query.boxTypeId) {
        if (router.query.search)
          args = {
            ...args,
            where: {
              AND: [
                {
                  boxTypeId: { equals: boxTypeId },
                },
                {
                  ...(parseFloat(search)
                    ? {
                        OR: [
                          {
                            price: { equals: parseFloat(search) },
                          },
                          {
                            number: { equals: parseFloat(search) },
                          },
                        ],
                      }
                    : {
                        OR: [
                          {
                            reference: {
                              contains: search,
                              mode: 'insensitive',
                            },
                          },
                          {
                            name: { contains: search, mode: 'insensitive' },
                          },
                        ],
                      }),
                },
              ],
            },
          };
      } else if (
        router.query.boxTypeId &&
        router.query.boxTypeId != 'all' &&
        !router.query.search
      ) {
        args = {
          ...args,
          where: {
            boxTypeId: { equals: boxTypeId },
          },
        };
      } else if (router.query.boxTypeId == 'all' && !router.query.search) {
        args = {
          ...args,
        };
      }
    }

    dispatch(getBoxList({ args }));
  };

  return fetchBoxList;
}
