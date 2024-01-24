import { SubCategoryQuery } from 'data/Query/subCategory.query';
import { useRouter } from 'next/router';
import { getPriceList } from 'services/redux/article/price';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchPricListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: SubCategoryQuery = {};
    if (router.query.search) {
      const search: any = router.query.search;
      args.where = {
        OR: [{ reference: { contains: search, mode: 'insensitive' } }],
      };
    }
    args.include = {
      article: true,
    };
    dispatch(getPriceList({ args }));
  };
};

export default useFetchPricListe;
