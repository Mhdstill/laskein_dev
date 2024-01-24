import OSTextField from 'components/shared/input/OSTextField';
import OSSelectField from 'components/shared/select/OSSelectField';
import { useEffect } from 'react';
import { useAppSelector } from 'services/redux/hooks';
import useFetchArticleListeFiltered from '../articles/hooks/useFetchArticleListFiltered';

export default function PriceForm() {
  const { articleList } = useAppSelector((state) => state.article);
  const fetchArticleList = useFetchArticleListeFiltered();
  useEffect(() => {
    fetchArticleList();
  }, []);

  return (
    <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col sm:items-center w-full">
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSTextField name="reference" size="small" label="Référence" />
        <OSTextField
          name="reduction"
          size="small"
          label="Reduction"
          type="number"
        />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSTextField
          name="currentPrice"
          size="small"
          label="Prix actuel"
          type="number"
        />
        <OSTextField name="rate" size="small" label="Taux" type="number" />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSTextField
          name="oldPrice"
          size="small"
          label="Ancien prix"
          type="number"
        />
        <OSSelectField
          id="article"
          name="articleId"
          label="Article"
          dataKey="reference"
          options={articleList}
          valueKey="id"
        />
      </div>
    </div>
  );
}
