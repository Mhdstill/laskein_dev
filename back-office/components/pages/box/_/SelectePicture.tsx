import AddAPhoto from '@mui/icons-material/AddAPhoto';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Skeleton } from '@mui/material';
import { useAppSelector } from 'services/redux/hooks';
import { MuiAvatar, MuiIconButton } from './styles';

type SelectPictureProps = {
  status: 'OPENED' | 'CLOSED' | 'PLAYING' | 'OTHERS' | string | undefined;
  isEditable?: boolean;
  selectedPicture?: string | ArrayBuffer;
  // eslint-disable-next-line no-unused-vars
  setSelectedPicture?: (selectedImage: string) => void;
};

export default function SelectePicture({
  status,
  isEditable = false,
  selectedPicture = '',
  setSelectedPicture,
}: SelectPictureProps) {
  const { box, isEditing, loading } = useAppSelector((state) => state.box);

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
    if (box) {
      const currentBoxImage = box.boxImage?.find(
        (item) => item.status === status
      );
      if (currentBoxImage) {
        if (currentBoxImage.photoUrl?.includes('https')) {
          setImgUrl(currentBoxImage.photoUrl);
        } else {
          let url = baseUrl + currentBoxImage?.photoUrl!;
          setImgUrl(url);
        }
      }
    }
  }, [box, imgUrl]);

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
              alt="box-picture"
              variant="square"
            >
              <AddPhotoAlternate className="anim" />
            </MuiAvatar>
          ) : (
            <MuiIconButton onClick={() => selectPicture()}>
              <AddAPhoto />
              {status && <Typography variant="body1">{status}</Typography>}
            </MuiIconButton>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <Skeleton
              variant="rectangular"
              animation="pulse"
              className="animate-pulse"
              width={225}
              height={240}
            />
          ) : imgUrl ? (
            <MuiAvatar src={imgUrl} alt="box-picture" variant="square" />
          ) : (
            <MuiIconButton>
              <AddPhotoAlternate className="anim" />
              {status && <Typography variant="body1">{status}</Typography>}
            </MuiIconButton>
          )}
        </>
      )}
    </div>
  );
}
