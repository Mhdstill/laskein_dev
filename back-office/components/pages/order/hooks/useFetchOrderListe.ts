import { OrderQuery } from 'data/Query/order.query';
import { useAppDispatch } from 'services/redux/hooks';
import { getOrderList } from 'services/redux/order';

const useFetchOrderListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: OrderQuery = {};
    args.include = {
      shoppingCart: {
        include: {
          user: {
            include: {
              address: true,
            },
          },
          game: {
            include: {
              article: {
                include: {
                  provider: true,
                  box: true,
                },
              },
            },
          },
        },
      },
    };
    dispatch(getOrderList({ args }));
  };
};

export default useFetchOrderListe;
