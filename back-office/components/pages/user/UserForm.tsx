import AddAPhoto from '@mui/icons-material/AddAPhoto';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from 'react';

import OSTextField from 'components/shared/input/OSTextField';
import OSSelectField from 'components/shared/select/OSSelectField';
import { useAppSelector } from 'services/redux/hooks';
import useFetchRoleListe from '../rule/_/hooks/useFetchRoleList';
import { MuiAvatar, MuiIconButton } from './styles';

interface UserFormProps {
  selectedPicture: any;
  setSelectedPicture: any;
}

export default function UserForm({
  selectedPicture,
  setSelectedPicture,
}: UserFormProps) {
  const [showPwd, setShowPwd] = React.useState(false);
  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;
  const [imgUrl, setimgUrl] = useState('');
  const [showPwdC, setShowPwdC] = React.useState(false);
  const fetchListRole = useFetchRoleListe();
  const { roleList } = useAppSelector((state) => state.role);
  const { isEditing, utilisateur } = useAppSelector(
    (state) => state.utilisateur
  );

  React.useEffect(() => {
    fetchListRole();
  }, []);

  useEffect(() => {
    if (utilisateur.photoUrl) {
      const url =
        baseUrl + '/upload-file/' + utilisateur.photoUrl.replace('/file/', '');
      setimgUrl(url);
    }
  }, [utilisateur]);

  const status = [
    { id: true, desc: 'Actif' },
    { id: false, desc: 'Désactivé' },
  ];

  const selectPicture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      const files = Array.from(input.files as any);
      if (files.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0] as File);
        fileReader.onload = function (event) {
          if (event?.target?.result) {
            setSelectedPicture(event.target.result as string);
          }
        };
      }
    };
    input.click();
  };

  return (
    <div className="flex lg:flex-row md:flex-row sm:flex-col-reverse sm:items-center w-full">
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSTextField
          name="firstName"
          variant="outlined"
          size="small"
          label="Nom"
          fullWidth
        />
        <OSTextField
          name="lastName"
          variant="outlined"
          size="small"
          label="Prénom"
          fullWidth
        />
        <OSTextField
          name="username"
          variant="outlined"
          size="small"
          label="Identifiant"
          fullWidth
        />
        <OSTextField
          name="email"
          variant="outlined"
          size="small"
          label="Email"
          fullWidth
        />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSSelectField
          id="Role"
          name="ruleId"
          label="Role"
          options={roleList}
          dataKey="name"
          valueKey="id"
        />
        <OSSelectField
          id="status"
          name="isActif"
          label="Statut"
          options={status}
          dataKey="desc"
          valueKey="id"
        />
        <OSTextField
          name="phone"
          variant="outlined"
          size="small"
          label="phone"
          fullWidth
        />
        <OSTextField
          variant="outlined"
          type={showPwd ? 'text' : 'password'}
          name="password"
          size="small"
          fullWidth
          label="Nouveau mot de passe"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label="Afficher"
                >
                  {showPwd ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <OSTextField
          variant="outlined"
          type={showPwdC ? 'text' : 'password'}
          name="confirmPassword"
          size="small"
          fullWidth
          label="Confirmer mot de passe"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPwdC(!showPwdC)}
                  aria-label="Afficher"
                >
                  {showPwdC ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="p-2.5 min-w[-225px] ">
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
            alt="Picture of the member"
            variant="square"
          />
        ) : (
          <MuiIconButton onClick={() => selectPicture()}>
            <AddAPhoto />
          </MuiIconButton>
        )}
      </div>
    </div>
  );
}
