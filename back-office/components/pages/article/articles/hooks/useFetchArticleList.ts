import { ArticleQuery } from 'data/Query/article.query';
import { useRouter } from 'next/router';
import { getArticleList } from 'services/redux/article/_';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchArticleListe = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return () => {
    let args: ArticleQuery = {};
    args.include = {
      articlePhoto: true,
      provider: true,
      subCategory: {
        include: {
          category: true,
        },
      },
    };
    // filter
    if (router.query) {
      // const categoryId = router.query.categoryId;
      // const subCategoryId = router.query.subCategoryId;
      // const providerId = router.query.providerId;
      const search = router.query.search as string;

      // const subCategoryRequest = () => {
      //   if (subCategoryId && subCategoryId != '') {
      //     return JSON.stringify({
      //       subCategoryId: { equals: subCategoryId },
      //     });
      //   }
      // };

      // const categoryRequest = () => {
      //   if (categoryId && categoryId != '') {
      //     return JSON.stringify({
      //       subCategory: {
      //         categoryId: { equals: categoryId },
      //       },
      //     });
      //   }
      // };

      // const providerRequest = () => {
      //   if (providerId && providerId != '') {
      //     return JSON.stringify({
      //       providerId: { equals: providerId },
      //     });
      //   }
      // };

      // const searchQuery = () => {
      //   if (search && search != '') {
      //     return JSON.stringify([
      //       {
      //         reference: {
      //           contains: search,
      //           mode: 'insensitive',
      //         },
      //       },
      //       {
      //         designation: { contains: search, mode: 'insensitive' },
      //       },
      //       {
      //         provider: {
      //           companyName: { contains: search, mode: 'insensitive' },
      //         },
      //       },
      //       {
      //         subCategory: {
      //           name: { contains: search, mode: 'insensitive' },
      //         },
      //       },
      //       {
      //         subCategory: {
      //           category: {
      //             name: { contains: search, mode: 'insensitive' },
      //           },
      //         },
      //       },
      //     ]);
      //   }
      // };

      if (router.query.search && router.query.search !== '') {
        args = {
          ...args,
          where: {
            OR: [
              {
                reference: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                designation: { contains: search, mode: 'insensitive' },
              },
              {
                provider: {
                  companyName: { contains: search, mode: 'insensitive' },
                },
              },
              {
                subCategory: {
                  name: { contains: search, mode: 'insensitive' },
                },
              },
              {
                subCategory: {
                  category: {
                    name: { contains: search, mode: 'insensitive' },
                  },
                },
              },
            ],
          },
        };
      }

      if (!router.query.search || router.query.search == '') {
        args = { ...args };
      }
    }
    dispatch(getArticleList({ args }));
  };
};

export default useFetchArticleListe;
