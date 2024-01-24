import { useRouter } from 'next/router';
import { getBoxArticleList } from 'services/redux/box/box-article';
import { useAppDispatch } from 'services/redux/hooks';

export default function useFetchAllBoxArticle() {
  const router = useRouter();

  const boxId = router.query.id;

  const dispatch = useAppDispatch();

  const fetchBoxArticleList = async () =>
    dispatch(
      getBoxArticleList({
        args: {
          include: {
            article: true,
            box: true,
          },
          where: {
            boxId: { equals: boxId },
          },
        },
      })
    );

  return fetchBoxArticleList;
}
