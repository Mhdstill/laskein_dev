import { useRouter } from 'next/router';
import { getProviderList } from 'services/redux/article/provider';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchProviderListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    if (router.query.search) {
      const search: any = router.query.search;
      args.where = {
        OR: [
          { companyName: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      };
    }
    dispatch(getProviderList({ args }));
  };
};

export default useFetchProviderListe;
