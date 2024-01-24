import { PostQuery } from 'data/Query/post.query';
import { getPostList } from 'services/redux/post';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchPostListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: PostQuery = {};
    args.include = {
      article: true,
    };
    dispatch(getPostList({ args }));
  };
};

export default useFetchPostListe;
