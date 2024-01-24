import OSTextField from 'components/shared/input/OSTextField';
import OSSelectField from 'components/shared/select/OSSelectField';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'services/redux/hooks';
import { MuiAvatar } from './styles';

const MemberForm = () => {
  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;
  const [imgUrl, setimgUrl] = useState('');
  const { member } = useAppSelector((state) => state.member);
  const status = [
    { id: true, desc: 'Actif' },
    { id: false, desc: 'Désactivé' },
  ];

  useEffect(() => {
    if (member.photoUrl) {
      const url =
        baseUrl + '/upload-file/' + member.photoUrl.replace('/file/', '');
      setimgUrl(url);
    }
  }, [member]);

  return (
    <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col-reverse sm:items-center w-full">
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSTextField
          name="firstName"
          disabled
          variant="outlined"
          size="small"
          label="Nom"
          fullWidth
        />
        <OSTextField
          name="lastName"
          disabled
          variant="outlined"
          size="small"
          label="Prénom"
          fullWidth
        />
        <OSTextField
          name="username"
          disabled
          variant="outlined"
          size="small"
          label="Identifiant"
          fullWidth
        />
        <OSTextField
          name="email"
          disabled
          variant="outlined"
          size="small"
          label="Email"
          fullWidth
        />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
        <OSTextField
          name="phone"
          disabled
          variant="outlined"
          size="small"
          label="phone"
          fullWidth
        />
        <OSSelectField
          id="status"
          name="isActif"
          label="Statut"
          options={status}
          dataKey="desc"
          valueKey="id"
        />
      </div>
      <div className="p-2.5 min-w[-225px] ">
        <MuiAvatar src={imgUrl} alt="Picture of the member" variant="square" />
      </div>
    </div>
  );
};

export default MemberForm;
