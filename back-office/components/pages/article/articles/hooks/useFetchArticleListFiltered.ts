import { ArticleQuery } from 'data/Query/article.query';
import { getArticleList } from 'services/redux/article/_';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchArticleListeFiltered = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: ArticleQuery = {
      where: {
        price: null,
      },
    };
    dispatch(getArticleList({ args }));
  };
};

export default useFetchArticleListeFiltered;
