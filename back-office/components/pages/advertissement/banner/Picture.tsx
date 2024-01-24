import AddAPhoto from '@mui/icons-material/AddAPhoto';
import React from 'react';

import { AddPhotoAlternate } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import BannerImageDTO from 'data/dto/BannerImage.dto';
import { MuiAvatar, MuiIconButton } from './styles';

type SelectPictureProps = {
  status:
    | 'WELCOME'
    | 'SUBSCRIPTION'
    | 'SPONSORSHIP'
    | 'ADVERTISEMENT'
    | string
    | undefined;
  isEditable?: boolean;
  selectedPicture?: string | ArrayBuffer;
  // eslint-disable-next-line no-unused-vars
  setSelectedPicture?: (selectedImage: string) => void;
  bannerImage?: BannerImageDTO;
};

export default function SelectPicture({
  status,
  selectedPicture = '',
  setSelectedPicture,
  bannerImage,
}: SelectPictureProps) {
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
    if (bannerImage) {
      let url = baseUrl + bannerImage?.bannerImgUrl!;
      setImgUrl(url);
    }
  }, [bannerImage, imgUrl]);

  return (
    <div className="px-2.5 min-w[-225px]">
      {bannerImage || selectedPicture ? (
        <MuiAvatar
          onClick={() => selectPicture()}
          src={selectedPicture ? (selectedPicture as string) : imgUrl}
          alt="picture"
          variant="square"
        >
          <AddPhotoAlternate />
        </MuiAvatar>
      ) : (
        <MuiIconButton
          onClick={() => selectPicture()}
          className="flex flex-col gap-2"
        >
          <AddAPhoto />
          {status && (
            <Typography variant="body1">
              {status === 'WELCOME' && 'Offre de bienvenue'}
              {status === 'SUBSCRIPTION' && "Offre d'abonnement"}
              {status === 'SPONSORSHIP' && 'Info parrainage'}
              {status === 'ADVERTISEMENT' && 'Publicité'}
            </Typography>
          )}
        </MuiIconButton>
      )}
    </div>
  );
}
