import React from 'react';

import { CloseRounded } from '@mui/icons-material';
import {
  cancelEditArticle,
  setActiveUi,
} from 'services/redux/article/_/articleSlice';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import KeyValue from '../../../shared/KeyValue';
import SelectePictureArticle from './SelectPicture';
import { MuiContainedButton } from './styles';

export default function ArticleDetails() {
  const { article } = useAppSelector((state) => state.article);

  const dispatch = useAppDispatch();

  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;

  const [imgUrl, setimgUrl] = React.useState('');

  React.useEffect(() => {
    if (article) {
      const status = 'FIRST';
      const currentArticlePhoto = article.articlePhoto?.find(
        (item) => item.status === status
      );
      if (currentArticlePhoto) {
        const url =
          baseUrl +
          '/upload-file/' +
          currentArticlePhoto?.photoUrl!.replace('/file/', '');
        setimgUrl(url);
      }
    }
  }, [article, imgUrl]);

  return (
    <div className="p-2.5 flex flex-col w-full">
      <div className="flex w-full justify-between">
        <SelectePictureArticle status="FIRST" />
        <SelectePictureArticle status="SECOND" />
        <SelectePictureArticle status="THIRD" />
        <SelectePictureArticle status="LAST" />
      </div>
      <div className="flex lg:flex-row md:flex-row sm:flex-col items-start w-full">
        <div className="h-full p-2.5 w-full flex flex-col gap-8">
          <KeyValue title="Reference" value={article.reference} />
          <KeyValue title="Designation" value={article.designation} />
          <KeyValue title="type" value={article.type} />
          <KeyValue title="Taille" value={article.size} />
        </div>
        <div className="h-full p-2.5 w-full flex flex-col gap-8">
          <KeyValue title="Couleur" value={article.color} />
          <KeyValue title="Url du Produit" value={article.productUrl} />
          <KeyValue title="Observation" value={article.observation} />
        </div>
        <div className="h-full p-2.5 w-full flex flex-col gap-8">
          <KeyValue
            title="Fournisseur"
            value={article?.provider?.companyName}
          />
          <KeyValue title="Taille unitaire" value={article?.unitySize?.name} />
          <KeyValue title="Sous Categorie" value={article?.subCategory?.name} />
        </div>
      </div>

      <div className="w-full flex gap-2.5 justify-end px-5">
        {/* <MuiContainedButton
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          className="normal-case bg-[#376F70] text-white"
          onClick={() => handleClickEditArticle()}
        >
          Editer
        </MuiContainedButton> */}
        <MuiContainedButton
          variant="contained"
          color="warning"
          startIcon={<CloseRounded />}
          className="!bg-orange-500 !normal-case text-white"
          onClick={() => {
            dispatch(cancelEditArticle());
            dispatch(setActiveUi('list'));
          }}
        >
          Annuler
        </MuiContainedButton>
      </div>
    </div>
  );
}

// function handleClickEditArticle() {
//   dispatch(
//     editArticle({
//       id: article?.id,
//       args: {
//         include: { articlePhoto: true },
//       },
//     })
//   );
//   dispatch(setActiveUi('form'));
// }
