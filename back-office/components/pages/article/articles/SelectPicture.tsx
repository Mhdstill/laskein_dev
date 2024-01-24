import AddAPhoto from '@mui/icons-material/AddAPhoto';
import React from 'react';

import { AddPhotoAlternate } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useAppSelector } from 'services/redux/hooks';
import { MuiAvatar, MuiIconButton } from './styles';

type SelectPictureProps = {
  status: 'FIRST' | 'SECOND' | 'THIRD' | 'LAST' | string | undefined;
  isEditable?: boolean;
  selectedPicture?: string | ArrayBuffer;
  // eslint-disable-next-line no-unused-vars
  setSelectedPicture?: (selectedImage: string) => void;
};

export default function SelectPictureArticle({
  status,
  isEditable = false,
  selectedPicture = '',
  setSelectedPicture,
}: SelectPictureProps) {
  const { article, isEditing, loading } = useAppSelector(
    (state) => state.article
  );

  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;

  const [imgUrl, setImgUrl] = React.useState('');

  function selectPicture() {
    let input: any = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      let files = Array.from(input.files);
      if (files.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0] as File);
        fileReader.onload = async function (result) {
          if (result && setSelectedPicture) {
            setSelectedPicture(result.target?.result as string);
          }
        };
      }
    };
    input.click();
  }

  React.useEffect(() => {
    if (article) {
      const currentArticlePhoto = article.articlePhoto?.find(
        (item) => item.status === status
      );
      if (currentArticlePhoto) {
        if (currentArticlePhoto.photoUrl?.includes('https')) {
          setImgUrl(currentArticlePhoto.photoUrl);
        } else {
          let url = baseUrl + currentArticlePhoto?.photoUrl!;
          setImgUrl(url);
        }
      }
    }
  }, [article, imgUrl]);

  return (
    <div className="p-2.5 min-w[-225px]">
      {isEditable ? (
        <>
          {isEditing || selectedPicture ? (
            <MuiAvatar
              onClick={() => selectPicture()}
              src={
                isEditing
                  ? (selectedPicture as string)
                    ? (selectedPicture as string)
                    : imgUrl
                  : (selectedPicture as string)
              }
              alt="article-picture"
              variant="square"
            >
              <AddPhotoAlternate />
            </MuiAvatar>
          ) : (
            <MuiIconButton onClick={() => selectPicture()}>
              <AddAPhoto />
            </MuiIconButton>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <Skeleton
              variant="rectangular"
              animation="pulse"
              width={225}
              height={240}
            />
          ) : imgUrl ? (
            <MuiAvatar src={imgUrl} alt="box-picture" variant="square">
              <AddPhotoAlternate />
            </MuiAvatar>
          ) : (
            <MuiIconButton>
              <AddPhotoAlternate />
            </MuiIconButton>
          )}
        </>
      )}
    </div>
  );
}
