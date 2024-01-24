import { useEffect, useState } from 'react';
import { useAppSelector } from 'services/redux/hooks';
import KeyValue from '../../shared/KeyValue';
import { MuiAvatar } from './styles';

export default function UserDetails() {
  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;
  const [imgUrl, setimgUrl] = useState('');
  const { utilisateur } = useAppSelector((state) => state.utilisateur);

  useEffect(() => {
    if (utilisateur.photoUrl) {
      const url =
        baseUrl + '/upload-file/' + utilisateur.photoUrl.replace('/file/', '');
      setimgUrl(url);
    }
  }, [utilisateur]);

  return (
    <div className="flex lg:flex-row md:flex-row sm:flex-col-reverse sm:items-center w-full">
      <div className="h-full p-2.5 w-full flex flex-col gap-8">
        <KeyValue title="Nom" value={utilisateur?.firstName} />
        <KeyValue title="Prénom" value={utilisateur?.lastName} />
        <KeyValue title="Identifiant" value={utilisateur?.username} />
        <KeyValue title="Email" value={utilisateur?.email} />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-8">
        <KeyValue title="Rôle" value={utilisateur?.rule?.name} />
        <KeyValue
          title="Statut"
          value={utilisateur?.isActif ? 'Activé' : 'Desactivé'}
        />
      </div>
      <div className="p-2.5 min-w[-225px] ">
        <MuiAvatar src={imgUrl} alt="Picture of the member" variant="square" />
      </div>
    </div>
  );
}
