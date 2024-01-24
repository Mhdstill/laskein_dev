import AddAPhoto from '@mui/icons-material/AddAPhoto';
import { useEffect, useState } from 'react';

import OSTextField from 'components/shared/input/OSTextField';
import { useAppSelector } from 'services/redux/hooks';
import { MuiAvatar, MuiIconButton } from './styles';

interface FournisseurFormProps {
  selectedPicture: any;
  setSelectedPicture: any;
}

export default function ProviderForm({
  selectedPicture,
  setSelectedPicture,
}: FournisseurFormProps) {
  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;
  const [imgUrl, setimgUrl] = useState('');
  const { isEditing, provider } = useAppSelector((state) => state.provider);

  useEffect(() => {
    if (provider.logo) {
      const url = baseUrl + provider.logo;
      setimgUrl(url);
    }
  }, [provider]);

  function selectPicture() {
    let input: any = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      let files = Array.from(input.files);
      if (files.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0] as File);
        fileReader.addEventListener('load', function (result) {
          setSelectedPicture(result?.target?.result as string);
        });
      }
    };
    input.click();
  }

  return (
    <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col sm:items-center w-full">
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5 lg:flex-col md:flex-col sm:flex-col-reverse">
        <OSTextField name="reference" size="small" label="Référence" />
        <OSTextField name="companyName" size="small" label="Raison Social" />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSTextField name="phone" size="small" label="Téléphone ou Fax" />
        <OSTextField name="address" size="small" label="Adresse" />
        <OSTextField name="webSite" size="small" label="Url site web" />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <div className="flex flex-col justify-center items-center">
          {(selectedPicture || isEditing) && (
            <p className="text-gray-500">Logo</p>
          )}
          {selectedPicture || isEditing ? (
            <MuiAvatar
              onClick={() => selectPicture()}
              src={
                isEditing
                  ? selectedPicture
                    ? selectedPicture
                    : imgUrl
                  : selectedPicture
              }
              alt="Picture of the article"
              variant="square"
            />
          ) : (
            <MuiIconButton onClick={() => selectPicture()}>
              <AddAPhoto />
            </MuiIconButton>
          )}
        </div>
      </div>
    </div>
  );
}
