import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import { Nunito } from 'next/font/google';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import GeneralForm from './GeneralForm';
import PasswordForm from './PasswordForm';
import { MuiAvatar, MuiIconButton } from './styles';

const nunito = Nunito({ subsets: ['latin'] });

export default function ProfilComponent() {
  const [selectedPicture, setSelectedPicture] = React.useState<string>('');

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

  const [activeUi, setActiveUi] = React.useState<'general' | 'password'>(
    'general'
  );

  const activeUiStyle =
    'text-[#376F70] font-bold leading-[20px] text-[16px] bg-[#CACED8] rounded-lg p-3 flex justify-start';
  const nonActiveUiStyle =
    'text-[#CACED8] font-bold leading-[20px] text-[16px] rounded-lg p-3 hover:bg-gray-50 flex justify-start';

  return (
    <div
      className={classNames(
        nunito.className,
        'flex flex-col gap-2.5 bg-white p-2.5 h-full'
      )}
    >
      <Scrollbars>
        {/* header */}
        <div
          className={classNames(
            'lg:gap-10 md:gap-5 sm:gap-2',
            'flex px-[72px] lg:flex-row md:flex-row sm:flex-col-reverse',
            'lg:items-center md:items-center sm:items-center '
          )}
        >
          <div className="w-[180px] h-[180px] relative">
            {selectedPicture ? (
              <MuiAvatar
                // src={() => selectPicture}
                alt="Picture of the article"
                variant="square"
              />
            ) : (
              <MuiIconButton></MuiIconButton>
            )}
            <button
              onClick={() => selectPicture()}
              className="absolute right-3 bottom-0 w-10 h-10 rounded-full text-white flex items-center justify-center bg-[#376F70] shadow-lg"
            >
              <PhotoCamera />
            </button>
          </div>
          <div className="lg:py-10 md:py-5 sm:py2 w-full flex flex-col lg:items-start md:items-start sm:items-center">
            <h4 className={'text-h4 text-[#376F70] font-bold text-[24px]'}>
              Mobina Mirbagheri
            </h4>
            <h5 className="text-h5 text-[#376F70] font-bold text-[20px]">
              Administrateur
            </h5>
          </div>

          <Button
            variant="contained"
            className="bg-[#376F70] w-[200px] normal-case"
          >
            Mettre à jour
          </Button>
        </div>

        {/* body */}
        <div className="flex px-[64px] pt-9 lg:flex-row md:flex-row sm:flex-col">
          {/* sidebar */}
          <div
            className={classNames(
              'lg:w-[240px] md:w-[240px] sm:w-full flex lg:flex-col md:flex-col sm:flex-row lg:justify-start md:justify-start sm:justify-center lg:border-r border-r-gray-100 pr-8 lg:gap-6 md:gap-3 sm:gap-2'
            )}
          >
            <button
              className={classNames(
                activeUi === 'general' ? activeUiStyle : nonActiveUiStyle
              )}
              onClick={() => setActiveUi('general')}
            >
              Editer le profil
            </button>
            <button
              onClick={() => setActiveUi('password')}
              className={classNames(
                activeUi === 'password' ? activeUiStyle : nonActiveUiStyle
              )}
            >
              Editer le mot de passe
            </button>
          </div>
          <div className="px-8 flex w-full h-full">
            {activeUi === 'general' && <GeneralForm />}
            {activeUi === 'password' && <PasswordForm />}
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}
