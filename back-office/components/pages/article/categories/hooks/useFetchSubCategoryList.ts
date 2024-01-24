import { SubCategoryQuery } from 'data/Query/subCategory.query';
import { useRouter } from 'next/router';
import { getSubCategoryList } from '../../../../../services/redux/article/sub-category';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchSubCategoryListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: SubCategoryQuery = {};
    if (router.query.search) {
      const search: any = router.query.search;
      args.where = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { reference: { contains: search, mode: 'insensitive' } },
        ],
      };
    }
    args.include = {
      category: true,
    };
    dispatch(getSubCategoryList({ args }));
  };
};

export default useFetchSubCategoryListe;
