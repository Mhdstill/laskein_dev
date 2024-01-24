import { useEffect, useState } from 'react';
import { useAppSelector } from 'services/redux/hooks';
import KeyValue from '../../shared/KeyValue';
import { MuiAvatar } from './styles';

export default function MemberDetails() {
  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;
  const [imgUrl, setimgUrl] = useState('');
  const { member } = useAppSelector((state) => state.member);

  useEffect(() => {
    if (member.photoUrl) {
      const url =
        baseUrl + '/upload-file/' + member.photoUrl.replace('/file/', '');
      setimgUrl(url);
    }
  }, [member]);

  return (
    <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col-reverse sm:items-center w-full">
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between">
        <KeyValue title="Nom" value={member?.firstName} />
        <KeyValue title="Prénom" value={member?.lastName} />
        <KeyValue title="Identifiant" value={member?.username} />
        <KeyValue title="Email" value={member?.email} />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between">
        <KeyValue title="Solde" value={`${member?.wallet?.balance} $`} />
        <KeyValue title="Téléphone" value={member?.phone} />
        <KeyValue
          title="Statut du compte"
          value={member?.isActif ? 'Activé' : 'Desactivé'}
        />
        <KeyValue title="Type d'abonnement" value="Basic" />
      </div>
      <div className="p-2.5 min-w[-225px] ">
        <MuiAvatar src={imgUrl} alt="Picture of the member" variant="square" />
      </div>
    </div>
  );
}
